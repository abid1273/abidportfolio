

## Remove Google Sign-In and Set Up Admin Account

### What
Remove the Google sign-in option from the auth page and configure your admin account with the provided credentials.

### Steps

**1. Update `src/pages/Auth.tsx`**
- Remove the Google login button, the "or" divider, and the `handleGoogleLogin` function
- Remove the `lovable` import since it's no longer needed

**2. Create your admin account**
- Use the Lovable Cloud auth configuration to enable auto-confirm temporarily so the account can be created without email verification
- Create your account with email `abidmehar783@gmail.com` and password `Abid@1281`
- Disable auto-confirm after account creation

**3. Assign admin role**
- Run a database insert to add your user ID to the `user_roles` table with role `admin`

**4. Re-disable auto-confirm**
- Turn off auto-confirm email signups so no one else can register without verification

### Security Note
- The Google sign-in button and related code will be fully removed
- Only you (with the admin role in `user_roles`) will have dashboard access
- Password is hashed automatically by the auth system

