# Data Loading and Presenting

Continue working with our basic app. 
App structure: 

1) Create a Multiview in the right part of the second row. Multiview should have 4 cells:
Ready-made Layout with Datatable and Form (Dashboard view)
Template for Users view
Template for Products view
Template for Admin view
2) Enable switching between Multiview cells using List on the left
Working with data:

Get data sources by the link: 
https://files.webix.com/30d/36d46ab8e511adfeda892d11b2da145f/data.zip

3) First cell: Dashboard view (Datatable and form)
Load the Datatable data (“data/data.js”) by url
Enable data editing via Form. This short tutorial may help you: https://webix.com/quick-start/introduction.html#!/1
Enable deleting of datatable records via a “delete” icon in the last datatable column.
Add sorting and filtering to all Datatable columns (as in the picture below)
Make the first column look like the datatable header (same grey background)
Highlight rows when mouse pointer hovers over them

4) Second cell: Users view
Create List and Chart and load the same “data/users.js” to both of them
Enable List filtering via a Text input
Enable sorting via related buttons
Add “Delete” icons to all list items to remove the corresponding items
Highlight first 5 items (add some different background to them)

5) Third cell: Products view, hierarchy
Create a TreeTable with company products
Load “products.js”
Provide a template for displaying expand/collapse and folder icons in the “title” column
Enable cell selection
Open all branches after data is loaded
