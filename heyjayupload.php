<?php

include('config.php');
require "twitteroauth/autoloader.php";

use Abraham\TwitterOAuth\TwitterOAuth;


$connection = new TwitterOAuth(
    'h8cRS7MfWAxhnjkE4NQpv1nlZ',
    'bYlyyd7g2FlMVeiON6YghQgfvtLQw1KfbVZfcANML91baqJxmp',
    '3008132719-JNnTRbar6v0kiFYlyPC2he0ztoKiOD6n8PLnmAG',
    'guwdBc4bxIn7f2y9pGasJtIionNgpH90HATHbr2il48Uh'
);

$content = $connection->get("account/verify_credentials");
$now = time();
$new_image_name = $now."hjpic.jpg";
move_uploaded_file($_FILES["file"]["tmp_name"], "imagesupload/".$new_image_name);
$image = "imagesupload/".$new_image_name;

//  Let's insert it in the database first.

$db_con = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']);


//  get the count first.
$query = mysqli_query($db_con, "SELECT count(*) FROM media WHERE hashtag='$hashtag' ORDER BY source_id DESC LIMIT 1");
$result = mysqli_fetch_row($query);
$count = $result[0] + 1;
$createdAt = date('r', $now);

$sqlInsert = "insert into media (time_now, source_id, created_at, user_id, name, screen_name, user_location, text, media_url, media_url_https, source, type, hashtag, post_url) ".
    " values('$now', '$count', '$createdAt','areyes1','eviteapp','eviteapp', 'eviteapp', 'eviteapp', '$image', '$image', 'eviteapp', 'photo', '$hashtag', '#')";


mysqli_query($db_con,$sqlInsert)or die(mysqli_connect_error());

$media1 = $connection->upload('media/upload', array('media' => $image));
$parameters = array(
    'hashtags'=> array('#heyjayforever'),
    'status' => '#heyjayforever',
    'media_ids' => implode(',', array($media1->media_id_string)),
);
$result = $connection->post('statuses/update', $parameters);
echo $connection->lastHttpCode();
if ($connection->lastHttpCode() == 200) {
    echo "success";
} else {
    echo $connection->lastHttpCode();
    echo "error";
}




?>