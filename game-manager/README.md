### 빌드 명령어

```
javac -encoding UTF-8 -d ./out -sourcepath ./src -classpath './lib/*' ./src/main/Main.java
jar cvfm agoraGameManager.jar manifest.txt -C ./out .
```
