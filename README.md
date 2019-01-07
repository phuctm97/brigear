<kbd><img src="logo.png" height="90px"/></kbd>

# Brigear E-commerce site

A Drupal + Commerce 2.x example e-commerce site.

Based on [drupal-composer/drupal-project](https://github.com/drupal-composer/drupal-project).



## Requirements

- Web server (Apache/Nginx).
- PHP 7+.
- Composer.
- MySQL 5+.



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
- Setup a new database on your environment and import the dump file using your preferable tools (*original mysql command line tool* is recommended).
- Update settings in your `brigear-dir/` to use your newly setup database (in file `brigear-dir/web/sites/default/settings.php` or `brigear-dir/web/sites/<your-domain>/settings.php`).

Now you've almost done, next extract some required dump files to your project:

- Go to `brigear-dir/dump/`.
- Locate file `web.modules.zip` and `web.sites.zip`.
- Extract `web.modules.zip` to `brigear-dir/web/modules/` (`web.modules.zip` contains some code changes in contributed drupal modules).
- Extract `web.sites.zip` to `brigear-dir/web/sites/default/` and `brigear-dir/web/sites/<your-domain>/` (only default if you are running in localhost).

Done! Brigear e-commerce site is now up on your environment, you can check it out by going to your domain.



## Common issues

#### Unknown collation `utf8mb4_0900_ai_ci`

This is because your *MySQL instance* is old and has no support for collation `utf8mb4_0900_ai_ci`.

> Solution: before dump `database.sql`, replace all occurrences of `utf8mb4_0900_ai_ci` by your supported collation (ex. `utfbmb4_general_ci`).

#### Drupal start new site installation

This is because you haven't update `settings.php` to use your database. 

> Solution: go to `brigear-dir/web/sites/default/settings.php` (or `brigear-dir/web/sites/<your-domain>/settings.php `) and add database configuration to field `$database`.

#### Missing `$settings['hash_salt']`

This is because you haven't set value for `$settings['hash_salt']` , *Drupal* requires it.

> Solution: go to `brigear-dir/web/sites/default/settings.php` (or `brigear-dir/web/sites/<your-domain>/settings.php `) and set variable `$settings['hash_salt']` to any value that you love.



## FAQ

#### How to import database using MySQL command line?

> Log into *MySQL shell*:
>
> ``` bash
> mysql -u <username> -p
> <enter-your-password>
> ```
>
> Create database (if needed):
>
> ``` mysql
> CREATE DATABASE <your-database-name>;
> ```
>
> Import sql file:
>
> ``` mysql
> USE <your-database-name>;
> SOURCE <sql-file>;
> ```