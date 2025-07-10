#  OutreachHub

This project implements a **multi-tenant platform** comprising two major portals:

- **Admin Portal**: For managing business workspaces and workspace users.
- **OutreachHub Portal**: For workspace users to manage contacts, campaigns, message templates, and view analytics.

The platform is designed for scalability, modularity, and ease of use, with clear separation of roles and responsibilities.

---

##  Features

### Admin Portal
Only accessible by admin users.

#### Modules

- **Authentication**
  - Login / Logout
- **Workspaces**
  - CRUD operations for workspaces
  - Manage workspace users

---

### OutreachHub Portal
Accessible by workspace users only.

#### Workspace Roles

- **Editor**: Full access to all modules
- **Viewer**: Read-only access

#### Modules

1. **Authentication**
   - Login / Logout

2. **Home Module**
   - Welcome message
   - Workspace Analytics
     - **Charts**
       - Campaigns done per day (filterable by date)
       - Campaign messages sent per type per day
       - Contacts reached per day
     - **Tables**
       - Recent 5 campaigns with tags
       - Top 5 tags by contact count

3. **Contacts Module**
   - CRUD contacts
   - Multi-tag support
   - Contacts identified primarily by phone number

4. **Message Templates Module**
   - CRUD message templates
   - Template types: Text, Text & Image

5. **Campaigns Module**
   - Create, update, delete, and copy campaigns
   - Draft and launch states
   - Campaign analytics
   - Only draft campaigns are editable
   - Launched campaigns are locked from editing
   - Copy feature to duplicate campaigns
---
