# asdf 基础

[[toc]]

## 简介

asdf 是一个可以按项目管理多种语言运行时版本的命令行工具

[官方文档](https://asdf-vm.com/)

相比于安装一大堆“专款专用”的版本管理工具来说，asdf-vm 具备以下特点：

- 用一个命令行工具支持多种编程语言

- 用完全一致的命令管理所有的编程语言

- 可以通过一个配置文件在一个地方保持全局的默认配置

- 可以通过一个 **`.tool-versions` 配置文件**按工程进行单独配置

- 支持现有的配置文件以方便迁移现有版本管理工具的使用

  例如： `.node-version`, `.nvmrc`, `.ruby-version`

- 在目录切换的时候自动切换运行时的版本

- 通过简洁的插件系统添加多种编程语言的支持

- 由插件自身管理命令行自动完成脚本，而不需要自己去配置

## 配置准备

mac Homebrew：

```shell
brew install asdf
```

```shell
echo -e "\n. $(brew --prefix asdf)/asdf.sh" >> ~/.zshrc
```

## 下载

```shell
asdf install 语言名 版本
```

> 如下： 下载 python 3.10.0

```shell
asdf install python 3.10.0
```

::: danger 必须注意加版本号

否则默认安装的是该语言的所有可用版本！

:::

## 查看

### 所有

```shell
asdf list
```

> 如下：可得知安装了一个版本的 node.js 和三个版本的 python

```shell
% asdf list
nodejs
  14.18.1
python
  3.10.0
  3.10.5
  3.9.8
```

### 当前

```shell
asdf current 语言名
```

> 如下：

```shell
% asdf current
nodejs          14.18.1         /Users/user/.tool-versions
python          3.10.0          /Users/user/.tool-versions
```

```shell
% asdf current nodejs
nodejs          14.18.1         /Users/chen/.tool-versions
```

## 设置版本

### 局部

如果希望设置在某个目录之下使用特定的版本

```shell
asdf local 语言名 版本
```

该命令能够在**当前文件夹**下生成一个 **`.tool-version` 文件** 记录指定的语言和版本号

下回再从命令行访问改目录的时候，就会自动切换到对应的语言版本

> 如下：

```shell

```

```js
```

---

### 全局

如果希望在全局设置默认的语言版本

```shell
asdf global 语言名 版本
```

该命令会在用户的 `$HOME` 文件夹下生成一个 `.tool-version`文件记录默认的语言和版本号

> 如下：

```shell

```

## 清除残留

### asdf reshim
