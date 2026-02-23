Challanges Part Question & Answer:

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: getElementById / getElementByClassName:
     
     getElementById- It selects element by unique ID and it returns a single   
     element object. (document.getElementById("header");)

     getElementByClassName- It selects all elements with a specific Class 
     and it returns HTMLCollection and its live.   

       (document.getElementsByClassName("box");)

     querySelector / querySelectorAll:
    
     qurerySelector- It selects the first matching element by using any css 
     selector and it returns single element.
             (document.querySelector(".box");
              (document.querySelector("#header");
     
      qureySelectorAll- It selects all matching element by using any css 
       selector and it returns NodeList and its static.
             (document.querySelectorAll(".box");)


2. How do you create and insert a new element into the DOM?

Ans: Firstly Create a Element:
     cosnt para = document.createElement('P');
     
     Secondly Add content or text:
     para.innerText = 'hello world';

     Thirdly Insert into DOM:
     document.body.appendChild('para');



3. What is Event Bubbling? And how does it work?

Ans: Event Bubbling is a mechanism when events clicked it runs first child element then its move forward to parent element, then grandparent element, until reaches the root element.

how it works- when you click a button inside a div, the click event firstly triggers on the button, then on the div, then on the body and finally on the document.


4. What is Event Delegation in JavaScript? Why is it useful?

Ans: Event Delegation is a technique where a parent handles events of child elements using bubbling.
  
  why its useful:-because-
    
 1. works for dynamically added elements
 2. reduces number of event listeners
 3. learn multiple ways to handle events
 4. use addEventListener for flexibility



5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: preventDefault() / stopPropagation()

  preventDefault()- It uses for stop defalult browsing behaviour. Like from submit , opening link and stops navigation etc. preventDeafault() method are prevent this type action.

  stopPropagation()- It uses for stops the Event Bubbling. It prevents the event from traveling up to parent elements.
