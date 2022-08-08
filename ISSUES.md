# Issues

## Waiting

-   [ ] Save QuestionState through AppContext + AppStore
    -   [ ] Save: Date, Points, Bads (_Missed_ ?), Goods
    -   [ ] to LocalStorage if SSO Session not available
    -   [ ] to RDBMS with SSO Session
-   [ ] Remove shuffle button - it is only for starting the _game_
-   [ ] Random should use the goods and bads too
    -   [ ] Maybe for a different view only for Bads for repeating? 🤔
-   [ ] 'lie' - multiple meanings

## Finished

-   [x] Next Auth + GitHub added 😎
-   [x] Heroku PostgreSQL added for persistency 😍
-   [x] Cities set added
-   [x] Icons for Translate, Clipart with FontAwesome

## OLD - No BackEnd persistency - now we have RDBMS 👍

Vercel has ReadOnly FS could not create JSON files...

Maybe other Free Cloud service for RDBMS or KeyValue / Object - Stores.

Should store Profile / Mistakes and Achievments - Points and Stats.

Right now we use the localStorage...
