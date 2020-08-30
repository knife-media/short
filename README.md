# Custom simple URL redirecter

We use this service to redirect short urls from `knf.md` domain to custom created long urls.  
Migrated from [yourls app](https://github.com/YOURLS/YOURLS) this shortener still use original database structure.  
Separate [WordPress module](https://github.com/knife-media/theme/blob/develop/app/core/modules/short-manager.php) is used to append links to common database and get clicks stat.  

## Installation

1. Create mysql database and upload `dump.sql` 
2. Install required npm modules using `npm install`
3. Copy `.env.example` to `.env` and replace database credentials
3. Start application using `node app.js`

If you wish to issue a pull request for code here, please do so on https://github.com/knife-media/short/
