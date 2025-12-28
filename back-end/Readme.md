<!--  -->

ADMIN

<!--  -->
#LOGIN

http://localhost:5000/api/auth/login

{
    email,
    password
}

{"success":true,"message":"Login successful","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExZDg4YjA0LWM3YjYtNGRhMC04OThmLWQ5ZWQ3ZGI3NDM0MiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2Njg4OTUxMSwiZXhwIjoxNzY2OTc1OTExfQ.mf51THXYNf6ljoupH_WLI1KXaqzkcTw7hczn3rCpas0","user":{"id":"11d88b04-c7b6-4da0-898f-d9ed7db74342","email":"admin@school.com","role":"ADMIN"}}}


<!--  -->


#CREATE TEACHER

http://localhost:5000/api/admin/teacher

{
    "name":"Aditya",
    "email":"aditya3012singh@gmail.com",
    "password":"pass123",
    "subject":"Mathematics"
}

{"success":true,"message":"Teacher created successfully","data":{"id":"9db773ef-e98b-4e52-812e-07daaa313874","name":"Aditya","subject":"Mathematics"}}


<!--  -->


#CREATE STUDENT


http://localhost:5000/api/admin/student

{
    "name":"Student1",
    "email":"student1@gmail.com",
    "password":"pass123",
    "rollNo":"1",
    "className":"1",
    "section":"A",
    "dob":"1-1-2010",
    "address":"Lucknow"
}

{"success":true,"message":"Student created successfully","data":{"id":"7ed88731-7b56-41c7-9d25-1f78eda92c3d","name":"Student1","rollNo":"1","class":"1","section":"A"}}


<!--  -->


#ADD PARENT TO STUDENT

http://localhost:5000/api/admin/student/7ed88731-7b56-41c7-9d25-1f78eda92c3d/parents

{
    "name":"Parent1",
    "email":"parent1@gmail.com",
    "password":"pass123",
    "contact":"7905361332",
    "relation":"Father"
}

{"success":true,"message":"Parent added successfully","data":{"id":"520d4402-3d1b-41e9-bea0-b868847107ee","name":"Parent1","relation":"Father","contact":"7905361332"}}


<!--  -->


#CREATE ADMIN

http://localhost:5000/api/admin/create

{
    "name":"Admin1",
    "email":"admin1@gmail.com",
    "password":"pass123"
}

{"success":true,"message":"Admin created successfully","data":{"id":"1fa3938c-d562-4aac-adcf-ee8c35b470a0","email":"admin1@gmail.com","role":"ADMIN"}}


<!--  -->


#GET ADMIN DASHBOARD

http://localhost:5000/api/admin/dashboard

{"success":true,"message":"Dashboard stats fetched successfully","data":{"users":{"students":2,"teachers":2,"parents":2},"academics":{"subjects":3,"timetableSlots":1},"attendance":{"total":0,"today":0},"ptm":{"upcoming":0}}}


<!--  -->

#this is left 
#INVITE PARENT

http://localhost:5000/api/admin/invite-parent

{
    "email":"parent2@gmail.com",
    "studentId":""
}


<!--  -->








<!--  -->

TEACHER SERVICE

<!--  -->


#GET TEACHER PROFILE

http://localhost:5000/api/teacher/profile

{"success":true,"message":"Teacher profile fetched successfully","data":{"id":"9db773ef-e98b-4e52-812e-07daaa313874","userId":"a82cf645-72c6-4d15-94e1-a63f6a0f15d9","name":"Aditya","subject":"Mathematics"}}


<!--  -->

