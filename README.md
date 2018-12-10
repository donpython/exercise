Interview Exercise
============
Nuadu


There are 3 test suites included: 
  * profile.spec.js - the real e2e positive test (following the workflow described in exercise description)
  * loginForm.spec.js - containing both positive and negative test cases for login form
  * settings.negative.spec.js - containing negative test cases for settings page (positive are tested in profile.spec.js)

Tests are working on both Chrome and Firefox web browsers - tested and certified by me ;) 
Default config is set to run tests on these two but in one session at the moment. 

To run tests, please navigate to project's root directory and run: 

~~~
protractor conf.js
~~~

Two of the 20 test cases fails:
  1. should display human readable message when user try to save too long password 
  2. should not allow to save number with less than 9 characters

First case is due to the unfriendly message (it's negative test but the message should be human friendly).
Second case is just because of my assumption that telephone number length should not be shorter than 9 characters.
