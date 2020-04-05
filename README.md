# HireMe - UI

The Webapp integrating the following api [HireMe](https://github.com/barelyhuman/hireme)

## Pending Feature Set

Includes tasks for the server sided code as well

- [x] Email Verification Flow (No more login/registration, use the god damn magic link!)
- [ ] Public Viewable Job Listings
- [ ] Additional Profile Details (Company Puts in its data, Applicant puts in experience and stuff)
- [ ] Internal JSON based Resume Builder (Has nothing to do with the above)
- [ ] Markdown Supported Descriptions
- [ ] Trigger Email and Notification for Shortlisting Status
- [ ] Chat? (I don't know, sending emails should be enough)
- ---- Will add more as I remember ----

## Pending UX/UI Components

- [ ] Cards
- [ ] Button
- [ ] Headers
- [ ] Dropdowns
- [ ] Loading States for Each of the Above
- [ ] Subtle Interaction Animations
- ---- Will add more as I remember ----

## Code Style and Consistency

This project uses [husky](https://github.com/typicode/husky) and [prettier](https://github.com/prettier/prettier) to maintain code consistency both during you code and when you commit.

Make sure you check the git status again after you commit to see if the formatter has made any changes.

To format all needed files run

```bash
  npm run prettier:format
```

For overall consistency in this setup the following settings in your editor, the below are for `vscode` but you find the synonymous settnig for other editors as well.

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.trimAutoWhitespace": true,
  "files.insertFinalNewline": true
}
```

## Architechture and Technology

This is just a gist of what's being used in this project

- Web Framework: [Preact](https://preactjs.com/)
- CSS Framework: [Water.css](https://watercss.netlify.com/)
- Network Utility: [Axios](https://github.com/axios/axios)

## Why no linters ?

I think that people learn with the mistakes they make, forcing them into understanding a lint rule just because I thought it was the right way to write code is the worst way I can limit them.

The reason prettier exists is so that I don't have to go through hundreds of lines of code diffs just because someone else formatted stuff differently.

If I do add a linter in the future, it'll only be to monitor erros in the code and not for enforcing a code style like loopback's or airbnb's.
