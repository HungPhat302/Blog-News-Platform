import "./Admin.css"
const mockUsers = [
    {
      _id: "1",
      username: "joshua_editor",
      email: "joshua@magazine.com",
      role: "editor",
      isActive: true,
      createdAt: "2026-01-15T10:30:00Z"
    },
    {
      _id: "2",
      username: "admin_main",
      email: "admin@magazine.com",
      role: "admin",
      isActive: true,
      createdAt: "2025-12-01T08:00:00Z"
    },
    {
      _id: "3",
      username: "reader_01",
      email: "reader@gmail.com",
      role: "reader",
      isActive: false,
      createdAt: "2026-03-10T14:20:00Z"
    },
    {
      _id: "4",
      username: "tech_writer",
      email: "author@magazine.com",
      role: "author",
      isActive: true,
      createdAt: "2026-02-20T11:45:00Z"
    }
  ];


const Admin=()=>{
    return(
        <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-info">
          <h1 className="admin-title">User Management</h1>
          <p className="admin-subtitle">Manage system users, roles, and account statuses</p>
        </div>
      </header>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>User Details</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user._id} className="user-row">
                <td className="user-info-cell">
                  <div className="user-main-info">
                    <span className="user-username">{user.username}</span>
                    <span className="user-email">{user.email}</span>
                  </div>
                </td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="status-wrapper">
                    <span className={`status-dot ${user.isActive ? 'active' : 'inactive'}`}></span>
                    {user.isActive ? 'Active' : 'Suspended'}
                  </div>
                </td>
                <td className="date-cell">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="actions-cell">
                  <div className="row-actions">
                    <button className="action-btn btn-edit-row" title="Edit User">
                      ✎ Edit
                    </button>
                    <button className="action-btn btn-delete-row" title="Delete User">
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}


export default Admin