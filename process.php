<?php
header('Content-Type: application/json');

// CONFIGURE THIS:
$to      = "ak11293@nyu.edu";
$subject = "New contact form message";
$from    = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$name    = strip_tags(trim($_POST['name']));
$phone   = strip_tags(trim($_POST['phone']));
$message = strip_tags(trim($_POST['message']));

// BASIC VALIDATION:
if (!$from || empty($name) || empty($message)) {
    echo json_encode(['status'=>'error']);
    exit;
}

// BUILD EMAIL BODY:
$body  = "Name: $name\r\n";
$body .= "Email: $from\r\n";
$body .= "Phone: $phone\r\n";
$body .= "Message:\r\n$message\r\n";

// SEND:
$headers = "From: $from\r\nReply-To: $from";
$sent = mail($to, $subject, $body, $headers);

// RESPOND:
if ($sent) {
    echo json_encode(['status'=>'success']);
} else {
    echo json_encode(['status'=>'error']);
}
