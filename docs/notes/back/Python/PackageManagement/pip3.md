# pip3 基础

![img](https://upload.wikimedia.org/wikipedia/commons/f/f8/Python_logo_and_wordmark.svg)

[[toc]]

## 简介

pip 是 Python 的包管理工具，用于安装第三方包 / 模块

Python3 自带 pip3，安装后库里既会有 pip3 也会有 pip

若只有 Python3，则 pip 和 pip3 是一样的

若同时存在 Python2 和 Python3，则 pip 与 pip3 安装的库保存的位置不同

> 查看 pip3 版本：

```bash
pip3 --version
pip3 -V
```

> 更新 pip 版本：

```bash
pip3 install --upgrade pip

# python3 -m pip install --upgrade pip
```

```shell
# 若使用 asdf 管理 python 版本时，更新 pip3：
/Users/user/.asdf/installs/python/3.10.0/bin/python3.10 -m pip install --upgrade pip
```

> 查看位置

```bash
which pip3
```

## 安装

```bash
# 最新版本
pip3 install 第三方包/模块

# 指定版本
pip3 install 第三方包/模块==版本号
pip3 install requests
pip3 install Django==1.7
```

## 卸载

```bash
pip3 uninstall 第三方包/模块
```

## 查看列表

```bash
pip3 list
```

```shell
% pip3 list

Package     Version
----------- -------
autopep8    1.6.0
pip         21.2.3
pycodestyle 2.8.0
setuptools  57.4.0
toml        0.10.2
```
