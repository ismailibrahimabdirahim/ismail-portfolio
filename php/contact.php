<?php
// Database configuration
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "portfolio_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate data (server-side validation)
$errors = [];

if (empty($name)) {
    $errors['name'] = 'Name is required';
}

if (empty($email)) {
    $errors['email'] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email';
}

if (empty($subject)) {
    $errors['subject'] = 'Subject is required';
}

if (empty($message)) {
    $errors['message'] = 'Message is required';
}

// If there are errors, return them
if (!empty($errors)) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $subject, $message);

// Execute the statement
if ($stmt->execute()) {
    // Send email notification (optional)
    $to = "your.email@example.com";
    $email_subject = "New Contact Form Submission: $subject";
    $email_body = "You have received a new message from your portfolio contact form.\n\n".
                  "Name: $name\n".
                  "Email: $email\n\n".
                  "Subject: $subject\n\n".
                  "Message:\n$message";
    $headers = "From: $email";
    
    mail($to, $email_subject, $email_body, $headers);
    
    header('Content-Type: application/json');
    echo json_encode(['success' => true]);
} else {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error saving message to database']);
}

// Close connections
$stmt->close();
$conn->close();
?>