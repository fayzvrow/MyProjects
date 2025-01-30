class Product:
    def __init__(self, name, price, category, stock):
        self.name = name
        self.price = price
        self.category = category
        self.stock = stock

    def __str__(self):
        return f"{self.name} - ${self.price} ({self.category}) - Stock: {self.stock}"


class Cart:
    def __init__(self):
        self.items = []

    def add_product(self, product, quantity):
        if product.stock >= quantity:
            self.items.append((product, quantity))
            product.stock -= quantity
            print(f"Added {quantity} of {product.name} to the cart.")
        else:
            print(f"Not enough stock for {product.name}.")

    def view_cart(self):
        print("\nCart Items:")
        total = 0
        for product, quantity in self.items:
            print(f"{product.name} x {quantity} - ${product.price * quantity}")
            total += product.price * quantity
        print(f"Total: ${total}")

    def checkout(self):
        print("Checkout successful!")
        self.items.clear()


class User:
    def __init__(self, username):
        self.username = username
        self.cart = Cart()

    def __str__(self):
        return f"User: {self.username}"


class Store:
    def __init__(self):
        self.products = []

    def add_product(self, product):
        self.products.append(product)
        print(f"Added product: {product.name}")

    def list_products(self):
        print("\nAvailable Products:")
        for product in self.products:
            print(product)
        print("")

store = Store()

store.add_product(Product("Macbook Air", 1000, "Electronics", 10))
store.add_product(Product("iPhone 16", 700, "Electronics", 15))
store.add_product(Product("Airpods Pro", 100, "Accessories", 50))

user = User("Nathan")

store.list_products()
user.cart.add_product(store.products[0], 1)
user.cart.add_product(store.products[1], 2)
user.cart.view_cart()

user.cart.checkout()
store.list_products()
