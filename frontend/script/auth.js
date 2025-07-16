let loginForm =
  document.getElementById("login-form") || document.createElement("form");
let signupForm =
  document.getElementById("sign-up-form") | document.createElement("form");

let loginEmailInput = document.getElementById("login-email");
let loginPasswordInput = document.getElementById("login-password");

let signupNameInput = document.getElementById("name");
let signupEmailInput = document.getElementById("email");
let signupMobileInput = document.getElementById("mobile");
let signupPasswordInput = document.getElementById("password");
let signupCPasswordInput = document.getElementById("c-password");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://6874d13cdd06792b9c955d04.mockapi.io/api/auth/user"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    console.log(users);

    const matchedUser = users.find(
      (user) =>
        user.email === loginEmailInput.value &&
        user.password === loginPasswordInput.value
    );

    console.log(matchedUser);

    if (matchedUser) {
      window.location.href = "../home/index.html";
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Something went wrong. Please try again.");
  }
});

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (signupPasswordInput.value !== signupCPasswordInput.value) {
    alert("Passwords don't match");
    return;
  }

  try {
    let res = await fetch(
      "https://6874d13cdd06792b9c955d04.mockapi.io/api/auth/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupNameInput.value,
          email: signupEmailInput.value,
          mobile: signupMobileInput.value,
          password: signupPasswordInput.value,
        }),
      }
    );

    let data = await res.json();
    console.log("User created:", data);
  } catch (err) {
    console.error("Error submitting form:", err);
  }
  window.location.href = "./login.html";
});
