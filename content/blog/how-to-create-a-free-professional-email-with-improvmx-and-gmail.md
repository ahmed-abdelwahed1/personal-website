---
title: How to Create a Free Professional Email with ImprovMX and Gmail
date: 2026-04-05
excerpt: Discover how to create a free professional email address using your
  custom domain. This step-by-step guide explains how to seamlessly send and
  receive business emails using ImprovMX and your personal Gmail account without
  any monthly fees!
coverImage: /images/uploads/profesional-email.png
tags:
  - Tutorials
  - Productivity
  - Freebies
---
Having a professional email address (like `hello@yourdomain.com`) makes your brand look trustworthy. But paying for business email hosting every month can be expensive, especially for beginners and small businesses.

The good news? You can create a professional email using your own custom domain and manage everything directly from your personal Gmail account—completely for free.

In this guide, we will show you how to use ImprovMX to forward emails to your Gmail, and how to configure Gmail to send emails using your custom domain name.

## What You Will Need

Before we begin, make sure you have the following ready:

* A custom domain name (e.g., `yourwebsite.com`) purchased from a registrar like Namecheap, GoDaddy, or Cloudflare.
* A standard, free Gmail account (e.g., `yourname@gmail.com`).
* Access to your domain’s DNS management dashboard.

## Step 1: Set Up Email Forwarding with ImprovMX

ImprovMX is a free email forwarding service. It catches emails sent to your custom domain and instantly forwards them to your regular Gmail account.

1. Go to the [ImprovMX website](https://improvmx.com/).
2. Right on the homepage, you will see two input boxes:

   * Your domain name: Enter your custom domain (e.g., `yourdomain.com`).
   * Your email address: Enter your personal Gmail address where you want to receive the messages.
3. Click on the Create a free alias button.
4. You will be asked to verify your Gmail address. Check your Gmail inbox, open the email from ImprovMX, and click the verification link.

## Step 2: Configure Your Domain's DNS Records

To make the email forwarding work, you need to prove you own the domain and tell the internet to route your emails through ImprovMX.

1. Log in to the website where you bought your domain name (like Namecheap or Cloudflare) and find your DNS Settings or DNS Management page.
2. ImprovMX will give you a list of MX Records and one TXT Record (SPF). You must add these to your DNS settings.
3. Add the MX Records:

   * Type: MX | Name/Host: `@` | Value: `mx1.improvmx.com` | Priority: `10`
   * Type: MX | Name/Host: `@` | Value: `mx2.improvmx.com` | Priority: `20`
4. Add the TXT Record (SPF):

   * Type: TXT | Name/Host: `@` | Value: `v=spf1 include:spf.improvmx.com ~all`
5. Save your changes. Keep in mind that DNS updates can take anywhere from a few minutes to a few hours to process across the internet. Go back to your ImprovMX dashboard and click Check Again until your domain status says "Active."

## Step 3: Test Your Receiving Setup

Now, anyone who emails `hello@yourdomain.com` will reach your personal Gmail inbox. Let's test it!

1. Ask a friend to send a quick email to your new professional address, or send one from a different email account.
2. Open your Gmail inbox. You should see the test message arrive within seconds.

## Step 4: Set Up Gmail to Send Emails (For Free)

Receiving emails is great, but you also need to send replies from your professional email so your personal Gmail address stays hidden. Here is how to set up Gmail's free SMTP server to do exactly that.

### A. Generate an App Password in Google

Because of Google’s strict security rules, you need a special, one-time password to connect your email alias.

1. Go to your Manage your Google Account page.
2. Navigate to the Security tab on the left-hand menu.
3. Scroll down and make sure 2-Step Verification is turned ON.
4. Search for App Passwords in the settings search bar at the top.
5. Create a new App Password (you can name it "ImprovMX"). Google will generate a 16-letter password in a yellow box. Copy this password and save it.

### B. Add Your Custom Email to Gmail

1. Open your Gmail inbox, click the Gear icon (Settings) in the top right corner, and click See all settings.
2. Go to the Accounts and Import tab.
3. Look for the section called Send mail as and click the link that says Add another email address.
4. A new yellow window will pop up:

   * Name: Enter the name you want people to see when you email them (e.g., Your Name or Company Name).
   * Email address: Enter your new professional email (e.g., `hello@yourdomain.com`).
   * Crucial Step: Make sure the Treat as an alias box is unchecked. Click Next Step.
5. Now, configure the SMTP server settings to send mail through Google:

   * SMTP Server: Delete what is there and type `smtp.gmail.com`.
   * Port: Select `587`.
   * Username: Enter your regular Gmail address (e.g., `yourname@gmail.com`).
   * Password: Paste the 16-letter App Password you generated earlier (do NOT use your normal Gmail password).
   * Choose Secured connection using TLS.
6. Click Add Account.
7. Gmail will send a verification code to your professional email. Because forwarding is already active, this email will land directly in your Gmail inbox! Open it, copy the code, and paste it into the popup window to verify.

## Conclusion

Congratulations! You have successfully set up a professional business email address for free using ImprovMX and Gmail.

Now, whenever you compose a new email or reply to a message in Gmail, you can simply click the "From" dropdown menu and select your custom domain email. Your clients will only see your professional address, keeping your brand strong and your budget intact.
