<img src="logo.png" height="64px" align="left">

# Brigear E-commerce site

A Drupal + Commerce 2.x example e-commerce site.

Based on [drupal-composer/drupal-project](https://github.com/drupal-composer/drupal-project).

## Installation

First clone/download the repo to your local environment.

> In the rest of this document, `brigear-dir/` will refers to where you located the repo in your local environment.

To proceed to the next step, you need to [install composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx).

After that, go to `brigear-dir/` and run `composer install` to install project dependencies:

```bash
cd <some-where>/brigear-dir/
composer install
```

Next, setup database for the project:

- Go to `brigear-dir/dump/`.
- Locate file `database.sql.zip` which is compressed zip file of `database.sql` database dump file.
- Setup a new database on your environment and import the dump file using your preferable tools (*phpmyadmin* is recommended).
- Update settings in your `brigear-dir/` to use your newly setup database (in file `brigear-dir/web/default/settings.php`).

Now you've almost done, next extract some required dump files to your project:

- Go to `brigear-dir/dump/`.
- Locate file `web.modules.zip` and `web.sites.zip`.
- Extract `web.modules.zip` to `brigear-dir/web/modules/` (`web.modules.zip` contains some code changes in contributed drupal modules).
- Extract `web.sites.zip` to `brigear-dir/web/sites/default/` and `brigear-dir/web/sites/<your-domain-name>/` (only default if you are running in localhost).

Done! Brigear e-commerce site is now up on your environment, you can check it out by going to your domain.