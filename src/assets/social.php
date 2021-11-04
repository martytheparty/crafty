<?php

function endsWith($string, $endString) 
{ 
    $len = strlen($endString); 
    if ($len == 0) { 
        return true; 
    } 
    return (substr($string, -$len) === $endString); 
} 


require('creds.php');

$link = mysqli_connect($hostname, $username, $password, $database);

if (mysqli_connect_errno()) {
   echo "Connect failed: %s\n".mysqli_connect_error();
   exit();
}


$myArr = array();

$sql = "SELECT gifts.g_id, title, description, path, smallPath, votes FROM gifts LEFT JOIN gxgi ON gxgi.g_id =gifts.g_id LEFT JOIN giftimages ON gxgi.gi_id = giftimages.gi_id WHERE gifts.deleted = false and gifts.g_id = '".$_GET["id"]."' ORDER BY gxgi.order ASC";



$result = mysqli_query($link,$sql) or die("Unable to select: ".mysql_error());


while($row = mysqli_fetch_assoc($result)) {
    array_push($myArr, $row);
}

$visitCount = 0;
$recordFound = false;
$countId = 0;

$sql = "SELECT * FROM giftviews WHERE g_id = '".$_GET["id"]."'";
$result = mysqli_query($link,$sql) or die("Unable to select: ".mysql_error());
while($row = mysqli_fetch_assoc($result)) {
    $visitCount = $row['count'];
    $recordFound = true;
    $countId = $row['gv_id'];
}


$visitCount = $visitCount + 1;

if ($recordFound) {
    $sql = "UPDATE giftviews SET count = $visitCount WHERE gv_id = $countId ";
} else {
    $sql = "INSERT INTO giftviews (g_id, count) VALUES (".$_GET["id"].","."1".")";
}

$result = mysqli_query($link,$sql) or die("Unable to select: ".mysql_error());







?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:url" content="http://<?php echo $_SERVER['SERVER_NAME'] ?>/assets/social.php?id=<?php echo $myArr[0]['g_id'] ?>" />
    <meta property="og:type" content="article" />    

    <?php

    $picture = "";
    foreach( $myArr as $gift ) {
        if (endsWith($gift['path'], 'mp4')) {

        } else {
            if ($picture == "") {
                $picture = $imagePath.$gift['smallPath'];
            }
        }
    }
    ?>


    <?php
    if (endsWith($myArr[0]['path'], 'mp4')) {
    ?>
        <meta property="og:image" content="<?php echo  $picture ?>" />
        <meta property="og:video:url" content="<?php echo $imagePath.$myArr[0]['path'] ?>" />
        <meta property="og:video:type" content="video/mp4" />
    <?php
    } else {
    ?>
        <meta property="og:image" content="<?php echo $imagePath.$myArr[0]['smallPath'] ?>" />
    <?php
    }
    ?>



    <meta property="og:title" content="<?php echo $myArr[0]['title'] ?>" />
    <meta property="og:description" content="<?php echo $myArr[0]['description'] ?>" />
    <meta property="fb:app_id" content="3461892437168596" />

    <title><?php echo $myArr[0]['title'] ?></title>
    <link rel="stylesheet" href="bootstrap.min.css">
    <style>
        .gift-list-content {
            margin-top: 90px;
        }
        .navbar img {
            margin: 0 5px 0 0;
        }
        .social-card {
            height: auto;
            max-width: 100%;
            width: 100%;
        }
</style>


</head>
<body>

<header>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
        <div class="container">
            <a class="navbar-brand navitem nav-link" href="/">
                <img width="40" src="logo.jpg" title="view count <?php echo $visitCount; ?>">
                Crafty By Melissa
            </a> 
            <div class="navbar-nav ml-3">
                &nbsp;
            </div>
        </div>
    </nav>
</header>
<script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script>
<div class="gift-list-content container">
    <div id="fb-root"></div>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0" nonce="AHarRUBl"></script>
    <div class="fb-share-button" data-href="http://<?php echo $_SERVER['SERVER_NAME'] ?>/assets/social.php?id=<?php echo $myArr[0]['g_id'] ?>" data-layout="button_count" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fdev.craftybymelissa.xyz%2Fgift.php%3Fid%3D<?php echo $myArr[0]['g_id'] ?>&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
    <script type="IN/Share" data-url="http://<?php echo $_SERVER['SERVER_NAME'] ?>/assets/social.php?id=<?php echo $myArr[0]['g_id'] ?>"></script>

    <?php
    echo '<div>'.$myArr[0]['title'].'</div>';
    echo '<div>'.$myArr[0]['description'].'</div>';
    ?>

    <div class="row justify-content-center">
    <?php
    foreach( $myArr as $gift ) {
    ?>
        <div class="social-card col-xs-12  col-sm-6  col-md-4  col-lg-3">
    <?php
        if (endsWith($gift['path'], 'mp4')) {
            echo "<video style='width:100%' class='gift-item img-fluid' src=".$imagePath.$gift['path']." controls></video>";
        } else {
            echo "<img style='width:100%' class='gift-item img-fluid' src=".$imagePath.$gift['smallPath'].">";
        }
    ?>
        </div>
    <?php
    }
    echo '<div style="display:none">ID: '.$myArr[0]['g_id'].'</div>';
    echo '<div style="display:none">Path: '.$imagePath.$myArr[0]['smallPath'].'</div>';

?>
    </div>
</div>
<footer class="footer fixed-bottom bg-dark navbar-dark p-1">
    <div class="container text-light text-center">
        &nbsp;
    </div>

    <?php 
            $sql = "insert gifthits (request, server, g_id, visit_date_time, visit_url, visit_referer, visit_browser) VALUES ('".implode($_SERVER)."','".$_SERVER['SERVER_NAME']."','".$myArr[0]['g_id']."','".$_SERVER['REQUEST_TIME']."','".$_SERVER['REQUEST_URI']."','".$_SERVER['HTTP_REFERER']."','".$_SERVER['HTTP_USER_AGENT']."')";

            //  echo $sql;
            $result = mysqli_query($link,$sql) or die("Unable to select: ".mysql_error());
            mysqli_close($link);
    ?>

</footer>
</body>
</html>



