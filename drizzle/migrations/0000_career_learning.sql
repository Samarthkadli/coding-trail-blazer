CREATE TABLE public.career_workspaces (user_id uuid NOT NULL, track_id text NOT NULL, notes text NOT NULL DEFAULT '', bookmarked boolean NOT NULL DEFAULT false, work jsonb NOT NULL DEFAULT '{}', updated_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(user_id,track_id));
GRANT SELECT,INSERT,UPDATE,DELETE ON public.career_workspaces TO authenticated;
GRANT ALL ON public.career_workspaces TO service_role;
ALTER TABLE public.career_workspaces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own career workspace" ON public.career_workspaces FOR ALL TO authenticated USING(auth.uid()=user_id) WITH CHECK(auth.uid()=user_id);
CREATE TABLE public.career_completions (user_id uuid NOT NULL, track_id text NOT NULL, activity_id text NOT NULL, xp integer NOT NULL DEFAULT 0 CHECK(xp>=0 AND xp<=200), completed_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(user_id,track_id,activity_id));
GRANT SELECT,INSERT ON public.career_completions TO authenticated;
GRANT ALL ON public.career_completions TO service_role;
ALTER TABLE public.career_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own completions" ON public.career_completions FOR SELECT TO authenticated USING(auth.uid()=user_id);
CREATE TABLE public.career_portfolios (id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL, display_name text NOT NULL DEFAULT '', headline text NOT NULL DEFAULT '', projects jsonb NOT NULL DEFAULT '[]', published boolean NOT NULL DEFAULT false, updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT,INSERT,UPDATE,DELETE ON public.career_portfolios TO authenticated;
GRANT SELECT ON public.career_portfolios TO anon;
GRANT ALL ON public.career_portfolios TO service_role;
ALTER TABLE public.career_portfolios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own portfolio" ON public.career_portfolios FOR ALL TO authenticated USING(auth.uid()=user_id) WITH CHECK(auth.uid()=user_id);
CREATE POLICY "Published portfolios" ON public.career_portfolios FOR SELECT TO anon,authenticated USING(published);
CREATE OR REPLACE FUNCTION public.record_career_activity(p_track text,p_activity text,p_answers integer[],p_tasks boolean[]) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE reward integer; BEGIN
IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Unauthorized'; END IF;
IF p_track NOT IN ('resume','github','linkedin','internships','interviews','coding','showcase','freelancing','opensource') THEN RAISE EXCEPTION 'Unknown track'; END IF;
IF p_activity IN ('module-0','module-1','module-2') THEN
IF cardinality(p_tasks)<>3 OR false=ANY(p_tasks) OR array_position(p_tasks,NULL) IS NOT NULL THEN RAISE EXCEPTION 'Complete all tasks'; END IF; reward:=50;
ELSIF p_activity='assessment' THEN
IF p_answers IS DISTINCT FROM ARRAY[1,0,2] THEN RAISE EXCEPTION 'Assessment not passed'; END IF;
IF (SELECT count(*) FROM career_completions WHERE user_id=auth.uid() AND track_id=p_track AND activity_id IN ('module-0','module-1','module-2'))<3 THEN RAISE EXCEPTION 'Finish the modules first'; END IF; reward:=200;
ELSE RAISE EXCEPTION 'Unknown activity'; END IF;
INSERT INTO career_completions(user_id,track_id,activity_id,xp) VALUES(auth.uid(),p_track,p_activity,reward) ON CONFLICT DO NOTHING;
END; $$;
REVOKE ALL ON FUNCTION public.record_career_activity(text,text,integer[],boolean[]) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.record_career_activity(text,text,integer[],boolean[]) TO authenticated;
CREATE OR REPLACE FUNCTION public.career_leaderboard() RETURNS TABLE(learner text,xp bigint) LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT p.display_name,sum(c.xp) FROM career_portfolios p JOIN career_completions c ON c.user_id=p.user_id WHERE p.published AND p.display_name<>'' GROUP BY p.user_id,p.display_name ORDER BY sum(c.xp) DESC LIMIT 20; $$;
REVOKE ALL ON FUNCTION public.career_leaderboard() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.career_leaderboard() TO anon,authenticated;