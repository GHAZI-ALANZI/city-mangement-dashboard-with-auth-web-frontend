import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports :[CommonModule]
})
export class UsersComponent implements OnInit {
  apiUrl = "https://localhost:7245/api/users"; //  API Base URL
  users: any[] = []; // ✅ Store Users

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers(); //  Load Users on Init
  }

  // ✅ Fetch Users from API
  fetchUsers() {
    if (!this.authService.isFullAdmin()) {
      console.warn("⚠ Cannot fetch users: User is not authenticated.");
      return;
    }
  
    const headers = this.getAuthHeaders();
    this.http.get<any[]>(`${this.apiUrl}/all`, { headers }).subscribe(
      (data) => {
        console.log(" Users Data from API:", data); // Debugging
        this.users = data;
      },
      (error) => {
        console.error("❌ Error fetching users:", error);
        if (error.status === 401) {
          Swal.fire("Unauthorized!", "Your session has expired. Please log in again.", "error");
          this.authService.logout();
        }
      }
    );
  }
  
  

  //  Register a New User (Only if FullAdmin)
  addUser() {
    if (!this.authService.isFullAdmin()) {
      Swal.fire("Access Denied", "Only FullAdmin can add users!", "error");
      return;
    }

    Swal.fire({
      title: "Register New User",
      html: `
        <input type="text" id="username" class="swal2-input" placeholder="Username">
        <input type="email" id="email" class="swal2-input" placeholder="Email">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
        <select id="role" class="swal2-select">
          <option value="0">FullAdmin</option>
          <option value="1">Admin</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Register",
      preConfirm: () => {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const role = parseInt((document.getElementById('role') as HTMLSelectElement).value, 10);

        if (!username || !email || !password) {
          Swal.showValidationMessage("All fields are required!");
          return false;
        }

        return this.http.post(`${this.apiUrl}/register`, { username, email, password, role }, { headers: this.getAuthHeaders() }).toPromise()
          .then(() => {
            this.fetchUsers(); // Refresh user list
            Swal.fire("Success", `User "${username}" registered successfully!`, "success");
          })
          .catch((error) => {
            console.error("Error registering user:", error);
            Swal.fire("Error", "Failed to register user!", "error");
          });
      }
    });
  }

  //  Ban/Unban User
  banUser() {
    if (!this.authService.isFullAdmin()) {
      Swal.fire("Access Denied", "Only FullAdmin can ban/unban users!", "error");
      return;
    }
  
    Swal.fire({
      title: "Select User to Ban/Unban",
      input: "select",
      inputOptions: this.getUserOptions(),
      inputPlaceholder: "Select user",
      showCancelButton: true,
      confirmButtonText: "Change Ban Status",
      preConfirm: (userName) => {
        if (!userName) {
          Swal.showValidationMessage("Please select a user!");
          return false;
        }
  
        const user = this.users.find(u => u.username === userName);
        if (!user) {
          Swal.fire("Error", "User not found!", "error");
          return false;
        }
  
        const action = user.isBanned ? 'unban' : 'ban'; //  Toggle ban/unban
        return this.http.post(`${this.apiUrl}/${action}/${userName}`, {}, { headers: this.getAuthHeaders() }).toPromise()
          .then(() => {
            user.isBanned = !user.isBanned; // ✅ Update UI immediately
            Swal.fire("Updated!", `${userName} has been ${user.isBanned ? 'banned' : 'unbanned'}!`, "success");
          })
          .catch((error) => {
            console.error(`Error ${action}ning user:`, error);
            if (error.status === 404) {
              Swal.fire("Error", `User '${userName}' not found!`, "error");
            } else {
              Swal.fire("Error", `Failed to ${action} user!`, "error");
            }
          });
      }
    });
  }
  
  
  //  Delete User (Only if FullAdmin)
  deleteUser() {
    if (!this.authService.isFullAdmin()) {
      Swal.fire("Access Denied", "Only FullAdmin can delete users!", "error");
      return;
    }

    Swal.fire({
      title: "Delete User",
      input: "select",
      inputOptions: this.getUserOptions(),
      inputPlaceholder: "Select user",
      showCancelButton: true,
      confirmButtonText: "Delete",
      preConfirm: (userName) => {
        if (!userName) {
          Swal.showValidationMessage("Please select a user!");
          return false;
        }

        return this.http.delete(`${this.apiUrl}/delete/${userName}`, { headers: this.getAuthHeaders() }).toPromise()
          .then(() => {
            this.fetchUsers();
            Swal.fire("Deleted!", `${userName} has been removed!`, "success");
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            if (error.status === 404) {
              Swal.fire("Error", `User '${userName}' not found!`, "error");
            } else {
              Swal.fire("Error", "Failed to delete user!", "error");
            }
          });
      }
    });
  }

  //  Generate Authorization Headers (JWT Token)
  private getAuthHeaders() {
    const token = this.authService.getToken(); //  Get JWT token
    if (!token) {
      console.warn("⚠ No token found! User is not authenticated.");
      return new HttpHeaders(); // Return empty headers (avoid errors)
    }
  
    return new HttpHeaders({
      "Authorization": `Bearer ${token}`, //  Attach JWT token
      "Content-Type": "application/json"
    });
  }

  //  Helper Function: Convert Users to Select Options
  private getUserOptions() {
    const options: { [key: string]: string } = {};
    this.users.forEach(user => {
      options[user.username] = `${user.username} (${user.role === 1 ? 'Admin' : 'User'}) - ${user.ban === 1 ? 'Banned' : 'Active'}`;
    });
    return options;
  }
}
