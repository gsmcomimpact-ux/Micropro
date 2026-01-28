
# Instructions de Déploiement - MicroPro

Pour déployer cette application sur un hébergement de type **cPanel (iFastNet, LWS, HostGator, etc.)**, suivez ces étapes :

## 1. Préparation du Backend (PHP/Laravel)
Si vous utilisez Laravel :
1. Compressez votre dossier projet (sauf `node_modules` et `vendor`).
2. Téléversez-le dans le dossier racine de votre compte cPanel (au-dessus de `public_html`).
3. Déplacez le contenu du dossier `public` de Laravel vers `public_html`.
4. Modifiez `index.php` pour pointer vers les bons chemins de `autoload.php` et `app.php`.
5. Configurez le fichier `.env` avec les accès MySQL créés via l'assistant cPanel.

## 2. Préparation du Frontend (React)
Si vous déployez la version React générée :
1. Exécutez `npm run build` localement.
2. Téléversez le contenu du dossier `dist` (ou `build`) directement dans `public_html`.
3. Assurez-vous d'avoir un fichier `.htaccess` pour gérer les routes SPA :
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## 3. Base de Données
1. Utilisez **phpMyAdmin** dans cPanel.
2. Importez le fichier `schema.sql` fourni.
3. Assurez-vous que l'utilisateur MySQL a tous les privilèges sur la base de données.

## 4. Optimisation Mobilité
- Activez la compression GZIP dans cPanel ("Optimiser le site Web").
- Utilisez PHP 8.1+ pour de meilleures performances.
- Assurez-vous que le certificat SSL (Let's Encrypt) est actif pour le HTTPS.

## 5. Mobile Money (Intégration Niger)
Pour le Niger (Alizza, Moov Money), vous devrez utiliser des passerelles comme **Sikka** ou des API directes. Le code React contient les placeholders pour appeler ces services.
