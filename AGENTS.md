<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the AIVORA intro at `/` and the existing CodeQuest adventure homepage at `/journey`; this lets the logo open the original experience without discarding its content.
- On a browser refresh from any inner page, return to the AIVORA intro with a client-side replace navigation; this makes the logo slide the starting screen without breaking direct links or in-app navigation.
