
run:
	ng serve --hmr	

build:	
	ng build

dev:
	git add . && git commit -m "Changes" && git push origin master && git push dev master 

pull:
	git pull origin master

live:
	git add . && git commit -m "Changes" && git push origin master && git push live master 

kill:
	sudo kill -9 $$(sudo lsof -t -i:4200)

gu:
	git add . && git commit -m "Changes" && git push origin master