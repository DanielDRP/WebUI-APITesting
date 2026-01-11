# Web UI Test (saucedemo.com)

## Pages
- https://www.saucedemo.com → Login  
- https://www.saucedemo.com/inventory.html → Products page  
- https://www.saucedemo.com/inventory-item.html?id=4 → Item detail  
- https://www.saucedemo.com/cart.html → Cart  
- https://www.saucedemo.com/checkout-step-one.html → Checkout form  
- https://www.saucedemo.com/checkout-step-two.html → Checkout overview  
- https://www.saucedemo.com/checkout-complete.html → Checkout complete  

---

## Standard User

- Attempting to access any page without being logged in redirects to the login page.
- When the session expires and a protected page is accessed, the user is redirected to the login page with the following error:  
  **“Epic sadface: You can only access '/cart.html' when you are logged in.”**  
  This is marked in the UI as an invalid credential error.

### Checkout

#### Checkout Form
- All fields are required.
- There does not appear to be any input validation or text parsing.
- It is not possible to purchase more than one unit of the same item.
- Checkout completion page is displayed correctly.

### Your Cart
- It is possible to complete a purchase with 0 items and a total of €0.
- Items can be removed from the cart.

### Products
- There are 6 products.
- All products have prices.
- All social media links work correctly.
- All filters work correctly.
- Burger menu works correctly.
- Product detail page works correctly.
- Clicking on a product image opens the detail view.
- Hovering over the “Add to cart” button changes the pointer, but not the color.

---

## Locked Out User
- Cannot log in. Error displayed:  
  **“Epic sadface: Sorry, this user has been locked out.”**

---

## Problem User

### Products
- All items display the same dog image.
- Filters do not work.
- Items can be added to the cart but cannot be removed.

### Cart
- Items can be removed from the cart.

### Checkout
- The “Last Name” field cannot be filled.
- Checkout cannot be completed.

---

## Performance Glitch User

### Inventory
- Slow loading of `inventory.html`.

### Login
- Slow login redirect to the products page.

### Product
- Slow navigation from product detail back to the product list.
- Slow filter changes.

---

## Error User

### Products
- Selected items cannot be removed.
- Some items cannot be added to the cart.
- Applying filters causes an error:  
  **“Sorting is broken! This error has been reported to Backtrace.”**

### Cart
- Items can be removed from the cart.

### Checkout
- The “Last Name” field cannot be filled, but the user can continue.
- Only First Name and ZIP Code are required.
- It is not possible to complete the purchase; the **Finish** button does nothing.

---

## Visual User

### Products
- Burger menu is tilted to the right.
- Prices are randomly generated on each page refresh.
- Cart icon is misaligned.
- Displayed prices do not match the actual values.
- Some item names are right-aligned.
- The first item on the left always shows an incorrect thumbnail:  
  https://www.saucedemo.com/static/media/sl-404.168b1cce10384b857a6f.jpg

### Cart
- Checkout button is incorrectly positioned (top-right).
