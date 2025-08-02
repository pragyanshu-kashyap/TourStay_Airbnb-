module.exports.isLoggedIn = (req, res, next) => {

  //console.log(req.user); // this will log the user object if the user is authenticated, otherwise it will be undefined. iss line ko use krke humara login , logout or signUp buttons ko render krwaayenge navbar.ejs file mai . Go and check it out

  //console.log(req); // this will log the request object, which contains information about the request made by the user or isi k andar originalUrl bhi hota hai, jo ki request ka original url hota hai, jisko hum login hone ke baad redirect karne ke liye use karte hain.

  if (!req.isAuthenticated()) { // req.isAuthenticated() is a method provided by passport to check if the user is authenticated ,
  
   // if the user is authenticated then we will render the new listing page so that the user can create a new listing, otherwise we will redirect to the login page with a flash message.

    req.session.redirectUrl = req.originalUrl; // this line is used to store the original url in the session, so that we can redirect the user back to the page they were trying to access after they log in. This is useful for redirecting the user back to the page they were trying to access before they were redirected to the login page.

    //req.originalUrl is the object inside the request object that contains the original url of the request, which is the url that the user was trying to access before they were redirected to the login page.

    // for more information about request (req) object, you can console.log(req) in here

    // If not authenticated, redirect to login page with a flash message
    req.flash("deletesuccess", "You must be logged in to create a listing.");
    return res.redirect("/login");
  }
  next(); // if the user is authenticated then we will call the next middleware function in the stack, or jo bhi aage callback ko kaam karna hoag wo apna kaam krega.

  //or agar logged in nhi hai toh hum req object se jis url pe jaane ka try kr rha tha bina login kiya hua, us originalurl ko req.session.redirectUrl me store kr denge, or fir usko login page pe redirect kr denge, taaki login hone ke baad waapsi apne us url pe redirect kar sake jaha jana chahta tha login se pehle.
};

module.exports.saveRedirectUrl = (req, res, next) => {
  // This middleware is used to save the original URL in the locals object before redirecting to the login page
 if (req.session.redirectUrl) {
    res.locals.redirectTo = req.session.redirectUrl; // Store the original URL in the locals object , because passport will reset the session after login, so we need to store the original URL in the locals object to access it after login.
  }
  else {
    res.locals.redirectTo = "/listings"; // If no redirect URL is saved, default to the listings page
  }
  next(); // Call the next middleware function in the stack
};

