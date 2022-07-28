# NVM

![](https://miro.medium.com/max/1050/0*csTuUtvi1VdLS4le.jpg)

## 简介

**NVM**（Node.js Version Manager）Node.js 的版本管理器

不同版本的 Node.js 会有改变，为了防止出错，

开发时用的什么版本，运行时就用什么版本

同一个项目有时也会要多个版本的 Node.js

## 安装

下载 NVM 前必须先删除已经下载的 Node.js

```bash
nvm --version
0.37.2
```

### 下载步骤

**1**

利用 brew 下载 NVM

```bash
brew install nvm
```

---

**2**

把下列内容复制粘贴到 **～/.zshr**文件中

```tex
  export NVM_DIR="$HOME/.nvm"
  [ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

---

**3**

移动到 用户 home 目录

检查是否存在**～/.zshr**文件

```bash
cd ~
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

检查 NVM 是否下载成功可以执行

```bash
nvm --version
0.37.2
```

### 问题解决

[Github 下载即问题解决 ](https://github.com/nvm-sh/nvm)

> - Since macOS 10.15, the default shell is `zsh` and nvm will look for `.zshrc` to update, none is installed by default. Create one with `touch ~/.zshrc` and run the install script again.
> - If you use bash, the previous default shell, run `touch ~/.bash_profile` to create the necessary profile file if it does not exist.
> - You might need to restart your terminal instance or run `. ~/.nvm/nvm.sh`. Restarting your terminal/opening a new tab/window, or running the source command will load the command and the new configuration.

## 查看 NVM 位置

NVM 的位置是：

`/Users/用户名/.nvm/`

**1. 在终端中查看**

移动到 home 目录下，显示~/下的所有隐藏文件夹

```bash
cd ~
ls -a
```

---

**2. 使用 Mac 的 Finder 查看**

在 Finder 中按下`command + shift + g`

输入 `~/.nvm/` 打开文件夹，

按下`command + shift + .`开关显示隐藏文件和文件夹

## 常用命令

### nvm current

显示当前使用的 Node.js 版本

```bash
nvm install 14.16.0
```

### nvm ls

列出所有已经安装的 Node.js 版本

```bash
nvm ls
```

### nvm ls-remote

列出所有可安装的 Node.js 版本

- 仅列出 Node.js 的所有 LTS 版本

```bash
nvm ls-remote --lts
```

- 仅列出最新的 LTS 版

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

### nvm install

安装指定的 Node.js 版本

```bash
nvm install <versioin>
```

```bash
nvm install 14.16.0
```

### nvm uninstall

卸载指定的 Node.js 版本

```bash
nvm uninstall <version>
```

### nvm deactivate

解除当前绑定的版本

NVM 默认是不能删除被设定为默认的版本的 Node.js，

特别是只安装了一个 Node.js 的时候，

此时需要先再解除绑定，再使用 `nvm uninstall` 删除

### nvm use

切换使用指定的 Node.js 版本

```bash
nvm use <version>
```

```bash
nvm use 14.16.0
Now using node v14.16.0 (npm v6.14.11)
```

### nvm alias default

设置默认 Node.js 版本

只安装了一个 node 的时候，默认使用该版本

```bash
nvm alias default <version>
```

```bash
nvm ls
->     v14.16.0
default -> 14.16.0 (-> v14.16.0)
```
