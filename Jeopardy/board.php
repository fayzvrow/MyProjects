<?php
session_start();
$_SESSION['score_p1'] = $_SESSION['score_p1'] ?? 0;
$_SESSION['score_p2'] = $_SESSION['score_p2'] ?? 0;

$questions = include 'data.php';

$categories = [];
foreach ($questions as $id => $q) {
    if (!in_array($q['category'], $categories)) $categories[] = $q['category'];
}

$byCategory = [];
foreach ($questions as $id => $q) {
    $byCategory[$q['category']][] = ['id'=>$id,'value'=>$q['value']];
}

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Game Board</title>
  <link rel="stylesheet" href="style.css">
</head>
<body class="board">

  <main class="container">
    <header class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <span style="margin-right:16px;font-weight:800">Player 1: <span style="color:var(--gold)">$<?php echo $_SESSION['score_p1']; ?></span></span>
          <span style="font-weight:800">Player 2: <span style="color:var(--gold)">$<?php echo $_SESSION['score_p2']; ?></span></span>
        </div>
      </div>
    </header>

    <section class="panel board-panel">
      <div class="board board-grid">
        <?php foreach ($categories as $cat): ?>
          <div class="cat"><?php echo htmlspecialchars($cat); ?></div>
        <?php endforeach; ?>

        <?php
        $tiers = [100,200,300,400,500];
        foreach ($tiers as $tier):
            foreach ($categories as $cat):
                $found = null;
                foreach ($byCategory[$cat] as $item) {
                    if ($item['value'] == $tier) { $found = $item; break; }
                }
                if ($found):
                    $id = $found['id'];
                    echo "<a class='card' href='question.php?q={$id}'>" . $found['value'] . "</a>";
                else:
                    echo "<div class='card disabled'>-</div>";
                endif;
            endforeach;
        endforeach;
        ?>
      </div>

      <div style="margin-top:12px">
        <a href="index.php" class="btn back-home">Back to Home</a>
      </div>
    </section>

  </main>
</body>
</html>
