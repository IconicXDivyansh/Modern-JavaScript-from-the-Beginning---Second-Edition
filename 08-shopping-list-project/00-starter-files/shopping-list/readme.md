Things learned while building this app ... 

- put all the necessary things at the top (at global scope) so you can access them wherever you want.

- try to create separate functions that do individual tasks. E.g -> function that create a button and function that creates a icon.

- to delete the list items instead of adding individual event listeners on each `li` make use of **event Delegation** . Add event listener only on the parent element and make use of this concept.

- the checkUI() will only run once in the global scope i.e when the page loads. But actually you want it to run every time when you add a new item.


`In Vanilla Js you have to account for everything, if you take something away make sure to put it  back`

- you have defined the listItems in the global scope , once they are defined they are defined. Be very careful about the constantly changing items. So make sure to define them with the function scope so most recent value is fetched. 
  
- 