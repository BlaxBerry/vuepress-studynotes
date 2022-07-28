# Git 使用基础

![img](https://img-blog.csdnimg.cn/img_convert/5ceaf99752368ca03206e59be1b2dd1e.png)

[[toc]]

## 分支

### 查看

查看本地仓库中的所有分支

```bash
git branch
```

> 如下：在本地的 main 分支下查看所有分支

```bash
% git branch

  branch-A
  branch-B
* main
```

---

### 新增

在本地仓库中新增一个分支

```bash
git branch 分支名
```

---

### 删除

要删除的分支不能是当前工作分支

即只能在其余分支删除目标分支

```bash
git branch -D 分支名
```

同时删除多个分支

```bash
git branch -D 分支A 分支B 分支C
```

---

### 切换

```bash
git checkout 本地分支名/远程分支名
```

也可切换到远端分支的指定 commit ，仅用来测试验证

比较危险不建议多用

```bash
git checkout 远端分支commit的SHA
```

> 如下：修改后直接 push 提交到远端分支

```bash
git checkout 远端分支commit的SHA

git add .
git commit -m "修改信息"

git push
```

---

### 合并

在某一分支下将其他分支合并过来

```bash
git merge 目标分支
```

> 如下：将分支 A → 分支 B

```bash
# git checkout B
git merge A
```

> 如下：将 main 分支最新状态合并到 dev 分支

```bash
git checkout main
git pull

git checkout dev
git merge main
```

<br/>

## 远程操作

### 拉取

将远程分支的最新状态拉取(更新)到本地的同名分支

即从远程下载代码并合并到本地

```bash
git pull
```

> 如下：在 main 分支下将远程 main 分支内容更新本地

```bash
git checkout main
git pull
```

---

### 提交

将当前分支提交到远端的同名分支

即将本地代码上传并合并到远程

```bash
git push
```

当远端仓库中没有要提交的同名分支存在时，终端会提示先建立并提交

```bash
git push --set-upstream origin 分支名
```

> 比如：在本地新增 dev 分支并提交到远端

```bash
git branch dev
git checkout dev

# 远端仓库中没有 dev 时：
git push --set-upstream origin dev

# 远端仓库中有 dev 时，直接 push 提交：
git push
```

<br/>

## 暂存

::: tip Git 的工作流程：

工作区 → 暂存区 → 本地仓库 → 远程仓库

:::

---

### 提交

将当前分支下的所有修改提交到暂存区

```bash
git add .
```

---

### 查看

查看仓库当前的状态，显示有变更的文件

```bash
git status
```

<br/>

## 本地提交

### 查看记录

查看当前分支所有 commit 的记录

```bash
git log
```

---

### 提交

将添加到**暂存区的修改内容**提交到本地仓库中

```bash
git commit -m “本次提交的说明”
```

---

### 撤销

::: tip git reset 回退命令：

```bash
git reset -soft commitID   # 取消commit
git reset -mixed commitID  # 取消commit + 取消add
git reset -hard commitID   # 取消commit + 取消add + 取消源文件修改
```

:::

> 如下：（常用）
>
> 放弃 commit 更改直接回退到指定版本的状态

```bash
git reset — hard commitID
```
