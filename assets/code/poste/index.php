<?php
// Page servie par Apache : affiche le contenu de la base créée en amont
$pdo = new PDO(
    'mysql:host=localhost;dbname=poste_dev;charset=utf8mb4',
    'dev',
    'mot_de_passe',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$logiciels = $pdo->query('SELECT nom, version, role FROM logiciel ORDER BY nom')
                 ->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Poste de développement</title>
</head>
<body>
  <h1>Logiciels installés</h1>
  <table>
    <tr><th>Nom</th><th>Version</th><th>Rôle</th></tr>
    <?php foreach ($logiciels as $l): ?>
      <tr>
        <td><?= htmlspecialchars($l['nom']) ?></td>
        <td><?= htmlspecialchars($l['version']) ?></td>
        <td><?= htmlspecialchars($l['role']) ?></td>
      </tr>
    <?php endforeach; ?>
  </table>
</body>
</html>
