# A Nursery App -  

### Live Demo-
#### https://dphi-nursery-app-gaurav.herokuapp.com/


### Application overview - 
##### Users  should be able to signup and see all the plants available from different nurseries. They should also be able to add the plants to their cart and place orders. Nurseries should be able to signup and add plants to their shop. They should also be able to view orders placed by users.


# To Run this Project on local -

```sh
$ python manage.py makemigrations core user

$ python manage.py migrate

$ python manage.py runserver
```

#### demo accounts-
| username | passsword |
| ------ | ------ |
| test_nursery | "test*#365" |
| test_nursery2 | "test*#365" |
| test_user1 | "test*#365" |
| test_user2 | "test*#365" |
| test_user3 | "test*#365" |




### APIs to
| Feature | Method | API |
| ------ | ------ | ------ |
| Signup (user and nursery) | POST | /user/auth/users/ |
| Login (user and nursery) | POST | /user/auth/jwt/create/ |
| Add a plant (nursery) (with image, price, name) | POST | /core/api/plants/ |
| List all plants (user) | GET | /core/api/plants/ |
| View a plant (user) | GET | /core/api/plants/<id>/ |
| Place order (user) | POST | /core/api/orders/ |
| View orders (nursery) | GET | /core/api/orders/<id>/ |



```sh
All API Routes -

 - Available for All authenticated users-
 - All Shops -           /core/api/shops/
 - All Plants -          /core/api/plants/
 - My Cart -             /core/api/cart/
 - My Orders -           /core/api/orders/

Only for nurseries -
 - My Shops -            /core/api/my/shops/
 - My Shop Orders -      /core/api/myshop/orders/
```