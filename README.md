#DANESH BOOM PROJECT
Version: 0.1.6-LTS
##Instruction to run the project :

- Installing Node modules
    ```sh
    yarn
    ```
- Running Developement server
    ```sh
    yarn start
    ```

##Instruction to run StoryBook :
- Running Developement server
    ```sh
    yarn run storybook
    ```
-------------------------------------
## **GIT**
##### Rules
1) pull from premaster into your branch.
2) commit and Push on your branch.
3) checkout to premaster.
4) merge your branch into premaster.
5) push premaster branch on remote server
-------------------------------------
## **Code Style**
- General:
    + TODO
            + Use TODO by name of developer and issue number every where that need change or fixing.
            example : // TODO mohsen #32 : ....

	- Indentation
		+ JS
            + Tab size : 2
            + Indent : 2
            + Continuation indent : 4
		+ SCSS
            + Tab size : 2
            + Indent : 2
            + Continuation indent : 4
		+ CSS
            + Tab size : 2
            + Indent : 2
            + Continuation indent : 4
	- React Components:
		+ Stateless Components:
            - should be written in Functional-Component way.
		+ Importing in Components:
            - should be imported base on alphabetic order.
		+ Naming declared functions:
            - Their names should be started with under-score( _ ).
		+ Returning in functions:
            - Return context inside ( ).


-------------------------------------------------
## Rest documentation server
	```sh
		http://restful.innowin.ir/docs/
	```
	
## Socket server
	```sh
		http://89.42.210.20:9095
	```
------------------------------------
##Create ssl key use config
```bash
openssl req -config dev.deliciousbrains.com.conf -new -sha256 -newkey rsa:2048 \
-nodes -keyout dev.deliciousbrains.com.key -x509 -days 365 \
-out dev.deliciousbrains.com.crt
```
