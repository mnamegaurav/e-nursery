# E-Nursery

## Application overview -

##### Users can signup and see all the plants available from different nurseries. They should also be able to add the plants to their cart and place orders. Nurseries should be able to signup and add plants to their shop. They should also be able to view orders placed by users.

### Live :sparkles: 
You can find the project live [here](https://enursery.herokuapp.com/) :point_left:


### Features :information_source: 

:heavy_check_mark: Robust and Secure APIs <br>

:heavy_check_mark: Authentication System <br>

:heavy_check_mark: CURD Operations <br>

:heavy_check_mark: Buying a Plant, Cart System <br>


# API Endpoints -
| Feature | Method | API |
| ------ | ------ | ------ |
| Signup | POST | /api/signup/ |
| Signin | POST | /api/signin/ |
| SignOut | POST | /api/signout/ |
| SignOut | POST | /api/signout/ |
| ------ | ------ | ------ |
| All Shops | GET | /api/shops/ |
| Create a Shop | POST | /api/shop/create/ |
| Retrieve, Update, Delete a Shop | GET,PUT,DELETE | /api/shop/<SHOP_ID>/ |
| All Plants | GET | /api/plants/ |
| Create a Plant | POST | /api/plant/create/ |
| Retrieve a Plant | POST | /api/plant/<PLANT_ID>/ |
| ------ | ------ | ------ |
| My Cart | GET, PUT | /api/me/cart/ |
| ------ | ------ | ------ |
| My Orders | GET | /api/me/orders/ |
| Create a New Order | POST | /api/me/order/create/ |
| Retrieve or Cance an Order | GET, PUT | /api/me/order/<ORDER_ID>/ |
| ------ | ------ | ------ |
| Get a Nursery Orders | GET | /api/shop/<SHOP_ID>/orders |

### Set this project locally :computer:

1. Go to the [project repo](https://github.com/hamhaingaurav/django_reactjs_nursery) and fork it by clicking "Fork" ( or Download the Zip file directly and start from the step 3 )<br>

2. Open terminal / command prompt and Clone the project using `git clone https://github.com/YOUR_USERNAME/django_reactjs_nursery.git`
  
3. Create a python3 virtual environment:

    ```bash
    $ python3 -m venv venv
    ```

    Or, use [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html):

    ```bash
    $ virtualenv venv
    ```

4. Activate the virtual environment:

    On Linux or Mac or any Unix based system-
    
    ```bash
    $ source venv/bin/activate
    ```
    
    On Windows-
    ```
    > venv\Scripts\activate
    ```

5. Now Install the dependecies:

    ```bash
    $ pip install -r requirements.txt
    ```

6. Creating local settings:
Create a `local_settings.py` file in the same directory where your `settings.py` resides.

    Copy this code in your `local_settings.py` file -
    ```
    DEBUG = True
    ```
    
7. Creating `.env` file:
Create a `.env` file in the same directory where your `manage.py` resides.

    Copy this text in your `.env` file -
    ```
    SECRET_KEY = 'secretkey'
    ```

8. Run the `migrate` command:

    ```bash
    $ python manage.py migrate
    ```

9. Now you are ready to go:

    #### Run the application

    ```bash
    $ python manage.py runserver
    ```

# Thanks