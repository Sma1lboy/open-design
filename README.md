<div align="center">

# open-design

> *"一句话，一个 `design.html`。不是 landing page builder，是设计稿生成器。"*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://claude.ai/code)
[![AgentSkills](https://img.shields.io/badge/AgentSkills-Standard-green)](https://agentskills.io)
[![Derived from](https://img.shields.io/badge/derived%20from-open--codesign-ff6a33)](https://github.com/OpenCoworkAI/open-codesign)

<br>

你在 Figma 推了三天，review 里来一句「这一版 AI 味儿有点重」。<br>
你打开 v0/Lovable/Bolt，给你拼出来的还是紫色渐变 + Inter + 那几个一模一样的 shadcn card。<br>
你想要的那种 editorial、dense、有 craft、像设计师真的花时间想过的稿 —— 没有。<br>

**所以我们搬了一个过来。**

<br>

[open-codesign](https://github.com/OpenCoworkAI/open-codesign) 是一个 Electron 桌面应用，它里面藏着一套极高质量的 system prompt：16 节方法论 + 12 个 JSX 黄金参考组件 + 4 个 builtin skills（pitch deck / 数据可视化 / 移动 mockup / anti-slop）。

**open-design** 把那一整套 prompt layer 剥出来，塞进 Claude Code，作为一个 skill 运行。

同一套 craft 规则，同一个质量上限，只是没有 Electron 的 GUI。输入一句话，产出一份 `design.html` 写到你当前目录，`open` 就能看。

[安装](#install) · [用法](#usage) · [示例](#示例) · [和 upstream 的区别](#和-upstream-的区别) · [路线图](#路线图)

</div>

---

### 🌟 致谢

> Prompt layer 全部来自 **[open-codesign](https://github.com/OpenCoworkAI/open-codesign)** (MIT) by OpenCoworkAI Contributors.
>
> 他们写了 16 节的系统提示、12 个 JSX 黄金参考、4 个 builtin skills —— 所有 craft 规则、所有 anti-slop 检查、所有"不要用 Inter 不要用紫色渐变"的愤怒，全是他们的。
>
> 我做的只是把它从 Electron 应用里拆出来、改掉 `<artifact>` 包装和 EDITMODE 协议这类跟 desktop UI 耦合的部分、加了一份 JSX→HTML 的翻译指引，让 Claude Code 能直接读。仅此而已。

---

## Install

```bash
git clone https://github.com/sma1lboy/open-design.git ~/.claude/skills/open-design
```

或者 clone 到任意位置然后跑 `./install.sh`（自带 stale-symlink 检测）。

重启 Claude Code session，skill 就会被发现。

---

## Usage

在任何目录打开 Claude Code，说人话：

```
设计一个 SaaS 落地页，给一个专注开发者日程同步的工具
```

```
design an analytics dashboard for an e-commerce platform — revenue, top products, cohort retention
```

```
mock up an iOS mobile app screen for tracking daily water intake
```

Claude 写一个 `design.html` 到当前目录。然后：

```bash
open design.html       # macOS
xdg-open design.html   # Linux
start design.html      # Windows
```

### 改

想改直接说：

```
hero 再暗一点，加一个 before/after 对比
把 pricing 从三列改成两列，突出中间那个
```

同一个文件就地重写。`.html` 是唯一真相，没有 patch、没有 diff、没有多文件。

### 什么会触发

- `design a landing page / dashboard / UI / mockup for …`
- `mock up a mobile screen / pricing page / case study`
- `设计一个 落地页 / 仪表盘 / 案例 / 定价页 / UI`
- `帮我设计一个 [页面/屏幕/界面]`

**不会**在 `design a database schema` / `design an API` / `design the architecture` 上触发。这是给视觉稿用的。

---

## 示例

这个仓库的 `smoke/` 目录里是真实的产物（不是 demo gif，是可以直接 `open` 的 HTML）：

| 文件 | prompt |
|------|--------|
| `smoke/autonomous-landing.html` | 给 [autonomous](https://github.com/Sma1lboy/autonomous) 做一个 landing — editorial serif，暖色调深底 |
| `smoke/codefox-redesign.html` | 给 [codefox](https://github.com/CodeFox-Repo/codefox) 重做 — 用户明说不喜欢当前版本，大胆换个方向 |
| `smoke/devsync-landing.html` | 开发者日程同步工具的落地页 |
| `smoke/ecom-dashboard.html` | 电商后台 dashboard，密集、多图表 |
| `smoke/water-mobile.html` | iOS 饮水打卡 app mockup |

起个 http server：

```bash
cd smoke && python3 -m http.server 8787
# 浏览器开 http://localhost:8787/
```

---

## 约束

老实说：

- **单文件 `.html`**。没有 `style.css`、没有 `app.js`、没有 build。
- **没有 hotlink 图片**。所有图像是 inline SVG、CSS gradient、或 data URI。Unsplash / 任意 CDN 图都不会出现。
- **`≤ 1000 行`**。超过会自动精简。不做大而空的稿。
- **不是应用**。按钮 `console.log`，表单不 submit。这是设计稿，不是 MVP。
- **不复刻特定品牌**。参考可以，像素级抄不行。

---

## 和 upstream 的区别

open-codesign 是 Electron 桌面应用，open-design 是 Claude Code skill。Prompt 层完全一样，差别在 UX：

| | open-codesign (Electron) | open-design (这个) |
|---|:---:|:---:|
| 16 节 system prompt | ✅ | ✅ |
| 12 个 JSX 黄金参考 | ✅ | ✅（`references/patterns/*.jsx`，输出时翻译成 HTML） |
| 4 个 builtin skills | ✅ | ✅（`references/builtin/*.md`） |
| Anti-slop / craft-directives / artifact-types | ✅ | ✅ |
| 单文件 HTML 产物 | ✅（iframe 内） | ✅（写到磁盘） |
| 同时保存多个设计 | ⚠️ 一次一个 | ✅ `design-1.html`, `design-2.html`, … |
| 实时预览 pane | ✅ | ❌ 你自己 `open design.html` |
| Comment Mode（点元素改局部） | ✅ | ⚠️ 用自然语言描述 |
| Tweak sliders（色值/间距拖条） | ✅ | ❌ 每次改动 = 整份重生 |
| PDF / PPTX 导出 | ✅ | ❌ 自己用 `wkhtmltopdf` / 浏览器打印 |
| SQLite 设计历史 | ✅ | ⚠️ 用 git 自己版本化 |
| 多模型 BYOK (Claude/GPT/Gemini/Ollama) | ✅ | 用 Claude Code 配的模型 |
| 安装体积 | ~200MB Electron app | 一个 symlink + ~7200 行 prompt |
| 离线 / 本地优先 | ✅ | ⚠️ Claude Code 会调 Anthropic |
| 进自己项目目录 | ❌ 设计留在 app 里 | ✅ `design.html` 落在 CWD，接着用 git / 其他 skill |

### 怎么选

- 桌面 GUI 配完整导出链路，**用 upstream Electron**。
- Claude Code 是日常驱动、想让设计稿跟代码躺在同一个 repo 里，**用这个**。

Craft 天花板一样，因为 prompt 一样。UX 不一样，选趁手的。

---

## 路线图

> 现在只是 CLI skill，UX 比 open-codesign 薄很多。如果有人真用起来了，想搬的下一批东西是：

- [ ] **实时预览**（watch `design.html` + 本地 HTTP server，skill 自动起）
- [ ] **Comment Mode 等价物**（点元素 → 让 Claude 只重写那个区域，不整份重生）
- [ ] **Tweak 微调协议**（色相 / 间距 / 字号的命名小改动，不消耗一次 full regeneration）
- [ ] **PDF / PPTX 导出 skill**（`/design-export design.html --pdf`）
- [ ] **Gallery index**（`smoke/` 那样的索引页自动生成）

这些是 open-codesign 有、我们还没搬的部分。先把 CLI 跑稳，再看需求。

---

## 故障排查

**Skill 没触发**
`ls -la ~/.claude/skills/open-design` 应该指向你 clone 的目录。重启 Claude Code。还不行就显式说：「design a landing page for X」。

**输出不是 `.html`**
skill 只写 `.html`。其他文件类型说明 skill 没被触发，见上一条。

**Console 有 Tailwind CDN 警告**
正常。Tailwind play-CDN 会打印一行 "cdn.tailwindcss.com should not be used in production" —— 设计稿无所谓。

**Chart 没渲染**
cdnjs 的库名**区分大小写**。view-source，确认是 `Chart.js/` 或 `recharts/`，不是 `chart.js/`。

**想看 skill 到底读了什么**
SKILL.md 用的是 progressive disclosure：基础 prompt 永远在上下文里，`references/` 里的 craft 细节按需加载。每份设计平均读 ~1000 行（SKILL + 1 个 pattern + 1-2 个 reference），总语料约 7200 行分在 25 个文件里。

---

## 这个 repo 里都是啥

```
open-design-skill/
├── open-design/                     # 实际的 skill
│   ├── SKILL.md                     # 常驻上下文（身份 / 工作流 / 输出合约 / anti-slop / 路由）
│   └── references/                  # 按需加载
│       ├── artifact-types.md        # 8 种稿型 + 密度底线
│       ├── craft-directives.md      # 完整 playbook
│       ├── anti-slop.md             # 禁用项 + 自查清单
│       ├── chart-rendering.md
│       ├── ios-starter.md
│       ├── marketing-fonts.md
│       ├── patterns/*.jsx           # 12 个 JSX 黄金参考 + JSX→HTML 翻译指引
│       └── builtin/*.md             # 4 个 builtin skills (pitch-deck / data-viz-recharts / mobile-mock / anti-slop)
├── smoke/                           # 真实产出示例
├── install.sh                       # symlink 到 ~/.claude/skills/open-design
├── Makefile                         # `make install` / `make upstream-check`
├── .upstream-sha                    # 对标 open-codesign 的 commit，方便追漂移
└── plan.md                          # /autoplan 审过的记录
```

---

## 许可

MIT — 见 [LICENSE](./LICENSE)。

Prompt layer derived from [open-codesign](https://github.com/OpenCoworkAI/open-codesign) (MIT), © OpenCoworkAI Contributors. See [NOTICE](./NOTICE) for attribution.

<div align="center">

<br>

MIT License © [sma1lboy](https://github.com/sma1lboy)

<i>Designed out loud. Shipped as one file.</i>

</div>
