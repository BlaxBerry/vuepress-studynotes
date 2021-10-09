# NVM

**NVM**（Node.js Version Manager）**Node.js的版本管理器**

![](https://miro.medium.com/max/1050/0*csTuUtvi1VdLS4le.jpg)

## 简介

不同版本的Node.js会有改变，为了防止出错，

开发时用的什么版本，运行时就用什么版本

同一个项目有时也会要多个版本的Node.js

所以需要一个管理Node.js版本的管理器



## 下载NVM

下载NVM前必须先删除已经下载的Node.js

---

### 下载步骤

**1**

利用brew下载NVM

```bash
brew install nvm
```

---

**2**

把下列内容复制粘贴到 **～/.zshr**文件中

```
  export NVM_DIR="$HOME/.nvm"
  [ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

---

**3**

移动到 用户home目录

```bash
cd ~
```

检查是否存在**～/.zshr**文件

```bash
ls -a
```

若**～/.zshr**文件不存在，就先生成文件

```bash
touch .zshrc
```

若**～/.zshr**文件存在，就打开，并把上述内容添加进去

```bash
open ~/.ashrc
```

---

**4**

然后加载文件

```bash
source ~/zshrc
```

---

**5**

检查NVM是否下载成功可以执行

```bash
nvm
```



### 问题解决

[Github下载即问题解决 ](https://github.com/nvm-sh/nvm)

>- Since macOS 10.15, the default shell is `zsh` and nvm will look for `.zshrc` to update, none is installed by default. Create one with `touch ~/.zshrc` and run the install script again.
>- If you use bash, the previous default shell, run `touch ~/.bash_profile` to create the necessary profile file if it does not exist.
>- You might need to restart your terminal instance or run `. ~/.nvm/nvm.sh`. Restarting your terminal/opening a new tab/window, or running the source command will load the command and the new configuration.





## 查看NVM的下载位置

NVM的位置是：

`/Users/用户名/.nvm/`

---

### 在终端中查看

移动到home目录下

```bash
cd ~
```

显示~/下的所有隐藏文件夹

```bash
ls -a
```

---

### 使用Mac的Finder查看

在Finder中按下`command + shift + g` 

输入 `~/.nvm/` 打开文件夹，

按下`command + shift + .`开关显示隐藏文件和文件夹





## NVM常用命令

### nvm ls-remote

列出所有可安装的Node.js版本

- 仅列出Node.js 的所有LTS版本

```bash
nvm ls-remote --lts
```

- 仅列出最新的LTS版

```bash
nvm ls-remote --lts | grep Latest
```

```js
~% nvm ls-remote --lts | grep Latest
         v4.9.1   (Latest LTS: Argon)
        v6.17.1   (Latest LTS: Boron)
        v8.17.0   (Latest LTS: Carbon)
       v10.24.0   (Latest LTS: Dubnium)
       v12.21.0   (Latest LTS: Erbium)
->     v14.16.0   (Latest LTS: Fermium)
```



### nvm ls

列出所有已经安装的Node.js版本



### nvm install <versioin\>

安装指定的Node.js版本

```bash
nvm install 14.16.0
```



### nvm current

显示当前使用的Node.js版本

```bash
nvm install 14.16.0
```



### nvm uninstall <version\>

卸载指定的Node.js版本



### nvm deactivate

解除当前版本绑定的Node.js版本

NVM 默认是不能删除被设定为默认的版本的Node.js，

特别是只安装了一个 Node.js的时候，

此时需要先再解除绑定，

再使用 `nvm uninstall <version>` 删除



### nvm use <version\>  

切换使用指定的Node.js版本

```bash
nvm use 14.16.0
Now using node v14.16.0 (npm v6.14.11)
```



### nvm alias default <version\>

设置默认Node.js版本

只安装了一个 node 的时候，默认使用该版本

```bash
nvm ls
->     v14.16.0
default -> 14.16.0 (-> v14.16.0)
```







