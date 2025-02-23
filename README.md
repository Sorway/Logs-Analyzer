# Logs-Analyzer

Ce projet a pour objectif d'analyser les logs Apache à l'aide d'une interface web en HTML/CSS, avec un backend en JavaScript utilisant le framework Express.js. Ce projet a été réalisé dans le cadre du module **Cycle de vie informatique** de notre formation en **Licence Professionnelle ASSR**.

<p>
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="version">
    <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="version">
    <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="version">
    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="version">
</p>

## Auteurs

- [**Jonathan**](https://github.com/Sorway)
- Alain
- Mathéo
- Erwann

## Description du Projet

L'application permet :
- L'upload de fichiers de logs Apache via une interface utilisateur.
- L'analyse des données pour extraire des statistiques clés comme :
    - Les adresses IP les plus fréquentes.
    - Les pages les plus visitées.
    - Les codes de réponse HTTP les plus courants.
    - Les périodes de trafic les plus élevées.
- L'affichage des résultats sous forme de tableaux et graphiques dynamiques.

## Installation et Utilisation

### Prérequis
- Node.js
- npm (Node Package Manager)

### Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/Sorway/Logs-Analyzer.git
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```

### Lancement du serveur

1. Lancez le serveur Express.js :
   ```bash
   node server.js
   ```
2. Ouvrez votre navigateur et accédez à :
   ```
   http://localhost:80
   ```

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](./LICENSE) pour plus de détails.
