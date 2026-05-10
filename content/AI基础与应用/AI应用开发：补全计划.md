---
title: AI应用开发：补全计划
description: 本文为AI 应用开发规划，梳理从基础入门到项目实战的完整学习路线，明确技术栈、学习阶段与实践方向，帮助系统掌握 AI 应用开发全流程能力。
urlname: AI-Application-Development-Addition
date: 2026-03-31T11:18:21
tags:
  - AI模型
  - 应用开发
categories:
  - AI基础与应用
draft: false
---

# CONTENT OUTLINE

1. AI应用开发规划


# 〇 AI Dev Plan

## 阶段1：基础入门（2周）

**目标**：搞懂LLM和Agent的基本概念，扫清术语障碍。

**核心内容**：

1. 大模型是什么？Transformer架构简图（不需要手推公式，理解输入输出即可）。
2. Prompt Engineering（提示词工程）基础：怎么写好的Prompt？什么是Few-shot、Chain-of-Thought？
3. 什么是AI Agent？理解ReAct模式（Reason+Act），即让LLM能调用工具、规划步骤。
4. 了解主流模型：GPT系列、Claude、国产模型（智谱、文心、通义千问）等。

**推荐资源**：
- 视频：李宏毅2024《生成式AI导论》前几节（B站有）。
- 文章：OpenAI官方Prompt工程指南。
- 动手：注册一个OpenAI或国内大模型API（如智谱AI），写几行Python代码调用API，玩一下Prompt。

## 阶段2：核心框架学习（3-4周）

**目标**：掌握LangChain或LlamaIndex的基本用法，能完成文档加载、向量检索、对话链等操作。

- **核心内容**：
    
    1. **RAG（检索增强生成）**：这是目前最实用的LLM应用模式。学习如何将外部文档（如PDF、数据库）向量化，存入向量数据库（如Chroma、FAISS），并在用户提问时检索相关内容送入LLM生成答案。
        
    2. **LangChain核心组件**：
        
        - Document Loaders（加载各类文档）
            
        - Text Splitters（文本分割）
            
        - Embeddings（文本向量化）
            
        - Vector Stores（向量存储）
            
        - Chains（链，将多个步骤串联）
            
        - Agents（代理，让LLM决定调用哪些工具）
            
    3. **构建第一个简单应用**：做一个本地文档问答机器人（例如用民航规章PDF做问答）。
        
- **推荐资源**：
    
    - LangChain官方文档（有中文版），跟着“Quickstart”做一遍。
        
    - 吴恩达《Building Systems with the ChatGPT API》免费课程（含LangChain入门）。
        
    - B站搜“LangChain实战”，找播放量高的视频跟着敲代码。
        

---

## 阶段3：实践项目（3-4周）

#### 项目A：基于RAG的机场调度知识问答助手

- **背景**：机场调度涉及大量规章、手册、历史案例。你可以做一个问答系统，让管制员或调度员用自然语言提问，系统能快速给出相关规则或类似案例。
    
- **实现步骤**：
    
    1. 收集资料：找一些民航调度相关的公开文档（如《机场停机位分配规则》、《航班正常性管理规定》等PDF）。
        
    2. 文档处理：用LangChain加载、分割、向量化，存入向量库。
        
    3. 构建问答链：用户提问 -> 检索相关片段 -> 送入LLM -> 生成回答。
        
    4. 进阶：加入“工具调用”——让LLM能调用你的**运筹优化算法**。例如，用户问“现在有5个延误航班，如何重新分配停机位最省拖车？”系统先检索规则，然后调用你预先写好的Python优化函数，返回结果并解释。
        
- **技术栈**：Python + LangChain + Chroma/FAISS + 大模型API。
    

#### 项目B：智能调度助手Agent

- **背景**：模拟一个简单场景，比如某机场突发大面积延误，需要快速生成调整方案。
    
- **实现步骤**：
    
    1. 定义工具：把你已有的优化算法（停机位分配或拖曳调度）封装成一个Python函数，作为Agent的一个工具（Tool）。
        
    2. 构建Agent：使用LangChain的Agent框架，让LLM能根据用户问题决定是否调用该工具，并解释调用结果。
        
    3. 增加记忆：让Agent能记住之前的对话，实现多轮交互。
        
- **亮点**：这个项目直接展示了“运筹优化 + AI Agent”的结合，非常契合你未来的职业方向。
    
- **产出**：将代码整理成GitHub仓库，写一个清晰的README，包含项目背景、架构图、运行效果截图。
    

---

## 时间投入建议

- 每天抽出1-1.5小时（晚上或周末集中时间），总计约80-100小时即可完成上述内容。
    
- 阶段1、2可并行进行，阶段3是重中之重，务必留出整块时间。
    

---

## 避坑指南

1. **不要陷入理论深坑**：不要花大量时间研究Transformer数学原理、模型训练、微调。你只需会调用API。
    
2. **优先选择国内模型**：考虑到访问便利性，可以用智谱AI（ChatGLM）、文心一言等国内大模型API，速度更快，成本低。
    
3. **代码能力>理论**：重点是跑通代码，实现功能。不懂的地方先Google解决，实在不行再深究。
    
4. **结合背景才有亮点**：不要做一个通用的聊天机器人，一定要贴上“民航”和“调度”标签，这才是你脱颖而出的地方。


# 一 LLM模型原理



# 二 推理模型LLM Api



# 三 Rag架构、向量原理


# 四 深入浅出LangChain



# 五 深入浅出LangGraph

## 1 LangGraph 中断与恢复机制：interrupt 原理

> [!tip] LangGraph 作为 LangChain 生态中用于构建有状态、多步骤 AI 工作流的核心框架，其**中断（interrupt）与恢复** 能力是实现 “人机协同” 工作流的关键（如审批、人工确认、风险核验等场景）。
> 本文将结合一个完整的 LangGraph 中断恢复演示案例，深入解析`interrupt`的底层实现原理、断点恢复的完整流程，并通过代码逐行拆解，帮你彻底掌握这一核心特性。

### 1.1 LangGraph 中断机制核心概念

#### 什么是 interrupt？

`interrupt`是 LangGraph 提供的工作流暂停机制，允许在工作流执行过程中，在指定节点主动触发暂停，等待人工干预（如审批、确认、纠错）后，从**断点处** 恢复执行，而非重新执行整个流程。

#### 核心依赖：Checkpointer（检查点）

中断与恢复的底层基石是`Checkpointer`（检查点管理器），其核心作用是：

- 保存工作流执行过程中的**全量状态**（包括当前执行节点、状态数据、上下文等）；
- 通过`thread_id`区分不同工作流实例，实现多任务 / 多用户的状态隔离；
- 恢复执行时，从指定`thread_id`的检查点加载状态，继续执行。

案例中使用`InMemorySaver`（内存级检查点存储），适合演示；生产环境可替换为持久化存储（如`RedisCheckpointer`、`SQLCheckpointer`）。

### 1.2 interrupt 底层实现原理

#### 常见误区澄清：不是简单的 “抛出异常”

很多开发者误以为`interrupt`是通过 Python 的`raise`抛出异常实现暂停，实则不然。

LangGraph 的中断基于**指令驱动的执行器模型**，核心是`Command`指令对象，而非语言级异常。

#### 中断的底层逻辑

LangGraph 执行器会解析节点返回的`Command`对象，当识别到`interrupt`指令时，触发以下行为：

1. **暂停执行**：立即停止工作流的节点调度，不再执行后续节点；
2. **保存检查点**：将当前执行状态（包括`thread_id`、当前节点、通道值、时间戳等）写入`Checkpointer`；
3. **返回中断标识**：执行结果中携带`__interrupt__`字段，对外暴露 “等待人工干预” 的状态。

#### interrupt 指令的代码实现

案例中`wait_approval`节点是触发中断的核心，代码如下：

```python
def wait_approval(state: ApprovalState) -> Command[Literal["after_approval", "cancel_node"]]: 
	# 构造中断指令，传入需要人工确认的上下文 
	decision = interrupt({ 
		"question": "请确认是否批准该任务？", 
		"task_id": state["task_id"], 
		"task_content": state["task_content"], 
	}) # 定义恢复后的节点跳转规则 
	return Command(goto="after_approval" if decision else "cancel_node")
```

- `interrupt(...)`：创建中断指令，可传入人工审批所需的上下文（如任务 ID、内容）；
- 返回的`Command`对象包含`goto`字段：定义恢复执行时的节点跳转逻辑（审批通过→`after_approval`，拒绝→`cancel_node`）；
- 执行器识别到`interrupt`后，不会立即执行`goto`逻辑，而是暂停并保存状态。

#### Checkpoint 的存储结构

`Checkpointer`保存的检查点包含以下核心信息（案例中`print_checkpoint`函数可直观打印）：

```plaintext
============================================================
[启动任务后 - 中断前]
============================================================
  Thread ID: xxx-xxx-xxx
  Checkpoint ID: 123456
  Timestamp: 1718xxxxxx.xxxxxx

  [Channel Values 状态]
    task_id: task-need_approval-001
    task_content: 请帮我审批这笔报销申请，金额：5000元
    status: pending
    final_result: 已处理任务：请帮我审批这笔报销申请，金额：5000元
    messages: [2 条消息]
      [0] human: 请帮我审批这笔报销申请，金额：5000元...
      [1] ai: 已处理任务：请帮我审批这笔报销申请，金额：5000元...
============================================================
```

- `channel_values`：工作流的核心状态（任务信息、消息记录、审批状态等）；
- `thread_id`：工作流实例唯一标识，是恢复执行的 “钥匙”；
- `ts`：检查点保存时间戳，用于追踪状态变更。

### 1.3 中断与恢复的完整流程（结合案例代码）

案例实现了 “提交任务→处理任务→等待审批（中断）→人工确认→完成” 的端到端流程，以下拆解每一步的核心逻辑：

#### 步骤 1：工作流与状态定义

##### 状态结构定义

通过`TypedDict`定义工作流的状态（`ApprovalState`），确保状态可被 Checkpointer 序列化保存：

```python
class ApprovalState(TypedDict):
    task_id: str               # 任务唯一标识
    task_content: str          # 任务内容
    status: Optional[Literal["pending", "approved", "rejected"]]  # 审批状态
    final_result: str          # 最终执行结果
    messages: Annotated[list[AnyMessage], operator.add]  # 消息列表（支持累加）
```

##### 节点与工作流拓扑

定义 4 个核心节点，并构建工作流拓扑：

```python
# 1. 处理任务（无中断）
def process_task(state: ApprovalState):
    return {
        "messages": [AIMessage(content=f"已处理任务：{state['task_content']}")],
        "final_result": f"已处理任务：{state['task_content']}",
    }

# 2. 触发中断（核心）
def wait_approval(state: ApprovalState) -> Command[...]：# 见上文

# 3. 审批通过后执行
def after_approval(state: ApprovalState):
    return {"status": "approved", "messages": [...], "final_result": ...}

# 4. 审批拒绝后执行
def cancel_node(state: ApprovalState):
    return {"status": "rejected", "messages": [...], "final_result": ...}

# 构建工作流拓扑
workflow = StateGraph(ApprovalState)
workflow.add_node("process_task", process_task)
workflow.add_node("wait_approval", wait_approval)
workflow.add_node("after_approval", after_approval)
workflow.add_node("cancel_node", cancel_node)
workflow.add_edge(START, "process_task")
workflow.add_edge("process_task", "wait_approval")
workflow.add_edge("after_approval", END)
workflow.add_edge("cancel_node", END)

# 绑定Checkpointer，编译工作流
checkpointer = InMemorySaver()
graph = workflow.compile(checkpointer=checkpointer)
```

工作流执行路径：`START → process_task → wait_approval → after_approval/cancel_node → END`

#### 步骤 2：启动任务，触发中断（/api/start-task）

前端提交任务后，后端执行以下逻辑：

```python
@app.post("/api/start-task")
async def start_task(request: TaskRequest):
    # 1. 生成唯一thread_id，隔离工作流实例
    thread_id = str(uuid.uuid4())
    config = {"configurable": {"thread_id": thread_id}}

    # 2. 初始化工作流状态
    initial_state = {
        "task_id": request.task_id,
        "task_content": request.task_content,
        "status": "pending",
        "final_result": "",
        "messages": [HumanMessage(content=request.task_content)],
    }

    # 3. 执行工作流（直到中断点）
    result = graph.invoke(initial_state, config)

    # 4. 检查中断标识，返回状态
    interrupts = result.get("__interrupt__", [])
    if interrupts:
        return {
            "success": True,
            "thread_id": thread_id,
            "status": "waiting_approval",  # 标记为等待审批
            "message": "任务已暂停，等待审批",
        }

    return {"success": True, "thread_id": thread_id, "status": "completed", "result": result}
```

核心行为：

- 执行`process_task`节点，更新状态（如`messages`、`final_result`）；
- 执行`wait_approval`节点，触发中断，执行器暂停；
- Checkpointer 保存当前检查点（中断前状态）；
- 前端接收`waiting_approval`状态，展示审批界面。

#### 步骤 3：人工审批，恢复执行（/api/approve）

用户点击 “确认通过 / 拒绝” 后，后端执行恢复逻辑：

```python
@app.post("/api/approve")
async def approve_task(request: ApprovalRequest):
    config = {"configurable": {"thread_id": request.thread_id}}

    # 1. 打印恢复前的检查点（调试用）
    print_checkpoint(request.thread_id, "恢复流程前 - 检查点状态")

    # 2. 恢复执行：传入resume指令，传递人工决策
    result = graph.invoke(Command(resume=request.approved), config=config)

    # 3. 打印恢复后的检查点（调试用）
    print_checkpoint(request.thread_id, "恢复流程后 - 最终状态")

    return {"success": True, "status": "completed", "result": result}
```

##### 恢复执行的核心逻辑：

1. **加载检查点**：执行器通过`thread_id`从 Checkpointer 加载中断时的状态（`task_id`、`task_content`、`messages`等）；
2. **解析 resume 指令**：根据`request.approved`（True/False），执行`wait_approval`节点定义的`goto`逻辑；
3. **执行后续节点**：
    
    - 审批通过：执行`after_approval`节点，更新`status=approved`；
    - 审批拒绝：执行`cancel_node`节点，更新`status=rejected`；
    
4. **完成工作流**：执行到`END`节点，更新 Checkpointer 为最终状态；
5. **返回结果**：前端接收结果后，更新状态和消息时间线。

#### 步骤 4：前端交互逻辑（补充）

前端（index.html）通过 JS 函数配合后端完成中断与恢复：

- `startTask()`：提交任务，接收`thread_id`和`waiting_approval`状态，展示审批区域；
- `approve(approved)`：提交审批结果，调用`/api/approve`接口，更新页面状态和消息时间线；
- `updateStatus/ renderMessages`：渲染工作流状态和执行日志，提升交互体验。



### 1.4 interrupt 关键知识点总结

| 核心知识点 | 详细说明                                                           |
| ----- | -------------------------------------------------------------- |
| 中断触发  | 节点返回`interrupt(...)`包装的`Command`对象，执行器识别后暂停                    |
| 状态保存  | Checkpointer 保存`thread_id`对应的全量状态（通道值、执行节点、时间戳）                |
| 恢复触发  | 调用`graph.invoke(Command(resume=...), config)`，通过`resume`传递人工决策 |
| 断点位置  | 恢复时从**触发中断的节点（wait_approval）的下一个节点** 执行，而非重新跑全流程               |
| 状态隔离  | 通过`config={"configurable": {"thread_id": ...}}`实现多任务 / 用户隔离    |
| 指令系统  | Command 支持`interrupt`（中断）、`resume`（恢复）、`goto`（节点跳转）等核心指令       |

### 1.5 什么是 `Command` 指令对象？

官方定义：`Command` 是 **LangGraph 工作流的核心控制协议**，是**节点与执行器通信的标准指令载体**。

简单说：

- 你的业务节点（如审批节点）不能直接控制工作流跳转 / 暂停，必须通过 `Command` 告诉执行器：**我要做什么**；
- LangGraph 执行器解析 `Command` 后，执行对应的操作（中断、跳转节点、恢复执行等）。

#### 核心作用

普通节点只能返回**状态数据**（更新工作流变量），而 `Command` 让节点拥有**控制工作流执行流程**的能力：

1. 触发中断（`interrupt`）等待人工干预；
2. 指定恢复后跳转到哪个节点（`goto`）；
3. 从断点恢复执行（`resume`）；
4. 动态控制工作流走向（替代固定的边 `add_edge`）。

---

#### `Command` 的底层本质

1. **它不是 Python 异常（raise Error）**
    
    这是新手最大误区：`interrupt` 不是靠抛异常暂停，而是靠 `Command` 指令通知执行器主动暂停。
2. **它是一个轻量级数据对象**
    
    仅封装**指令类型 + 参数**，无复杂逻辑，执行器负责解析执行。
3. **工作流的「交通信号灯」**
    
    执行器（引擎）只认 `Command` 指令，节点通过它下达「暂停、跳转、恢复」命令。

---

#### 最常用的 3 种 `Command` 指令

案例的审批代码中用到了 **`goto` + `interrupt`**，恢复时用到 **`resume`**，这是人机协同场景的核心三件套：

|指令参数|作用|适用场景|
|---|---|---|
|`goto="节点名"`|指定工作流跳转到目标节点|中断恢复后、条件分支跳转|
|`interrupt=上下文`|触发工作流中断，暂停执行|人工审批、确认、二次核验|
|`resume=用户输入`|从断点恢复执行，传递人工决策|用户点击同意 / 拒绝后恢复|



### 1.6 扩展与实战建议

1. **持久化存储**：将`InMemorySaver`替换为`RedisCheckpointer`/`SQLCheckpointer`，避免服务重启后状态丢失；
2. **多级中断**：扩展节点逻辑，实现多节点中断（如 “初审→复审→终审”）；
3. **超时处理**：增加定时任务，对超时未审批的任务自动标记为 “拒绝”；
4. **异常处理**：在恢复执行时增加异常捕获，处理检查点不存在 / 状态异常的情况；
5. **日志监控**：通过`print_checkpoint`类的逻辑，监控工作流状态变化，便于问题排查。

### 1.7 恢复执行后的位置

- **中断恢复后，`wait_approval` 节点会【从头重新完整执行】**；
- 但**节点内的 `interrupt()` 函数不会再次触发暂停**，而是**直接返回用户传入的恢复值**，继续执行后续代码；
- 之前说的「回到 `interrupt` 处」，指的是 **`interrupt` 的行为**，而非**节点不重新执行**！

#### LangGraph 为什么要重新执行节点？

这是 LangGraph 的**底层设计决定**，和协程 / 线程的「栈恢复」完全不同：

1. **LangGraph 节点是【纯函数】**
    无内部状态、无执行上下文缓存，执行器不保存函数的调用栈；
2. **检查点只保存「数据状态 + 当前节点名」**
    不保存代码行的执行指针；
3. **恢复逻辑**
    加载检查点 → 找到**中断时所在的节点** → **重新调用这个节点函数** → 执行到 `interrupt()` 时直接返回用户值。

#### 第二次执行「跳过暂停」的核心原理

`interrupt()` **不是普通的 Python 函数**，它是 **LangGraph 执行器的状态钩子函数**。

第二次执行时「跳过暂停、直接返回值」的底层逻辑：

1. 第一次触发中断后，**执行器会在 Checkpoint（检查点）中写入「中断标记」**；
2. 恢复执行时，执行器检测到**中断标记**，直接向 `interrupt()` 注入用户的返回值；
3. 完全跳过「暂停流程」，函数立即返回，实现无感知穿透。

---

#####  支撑底层实现的 3 个核心组件

所有中断 / 恢复逻辑，都依赖 LangGraph 底层的 3 个关键部分：

| 组件                    | 核心作用                                                          |
| --------------------- | ------------------------------------------------------------- |
| **Checkpoint（检查点）**   | 存储**中断元数据**：`是否中断(interrupted)`、`中断上下文`、`用户恢复值(resume_value)` |
| **Executor（执行器）**     | 工作流引擎，调度节点、检测中断状态、控制 `interrupt()` 行为                         |
| **interrupt () 钩子函数** | 无自身暂停逻辑，仅向执行器发送请求，行为完全由执行器决定                                  |

##### 分两次执行：底层逐行拆解

用你的 `wait_approval` 节点，模拟**底层真实执行流程**：

**第一次执行**：首次运行节点 → 触发中断

1. 执行器调度 `wait_approval` 节点
2. 执行 `print` → 第一次打印
3. 代码走到 `decision = interrupt(...)`
4. `interrupt()` 向执行器发起请求：**需要暂停，等待用户输入**
5. 执行器检测：**无中断标记** → 执行暂停逻辑：
    
    - 写入检查点：`interrupted = True`
    - 保存当前节点、业务状态、中断上下文
    - 终止节点执行，工作流彻底暂停
    
6. 节点后续代码（`return Command`）**完全不执行**

---

**第二次执行**：恢复运行 → 跳过暂停（核心魔法）

1. 用户传入审批结果，调用 `resume` 恢复
2. 执行器加载检查点，发现两个关键信息：
    
    - 中断标记：`interrupted = True`
    - 用户恢复值：`resume_value = True/False`
    
3. 执行器**重新调度 `wait_approval` 节点**
4. 执行 `print` → 第二次打印
5. 代码**再次走到 `interrupt(...)`**
6. **底层核心穿透逻辑**：
    
    `interrupt()` 向执行器请求，执行器**直接返回预存的用户值**
    
    ✅ 不触发暂停
    
    ✅ 不新建检查点
    
    ✅ 立即赋值给 `decision`
7. 执行节点剩余代码，返回 `Command` 并跳转

---

##### 极简伪代码：1:1 还原 `interrupt` 底层实现

用最通俗的 Python 伪代码，还原框架底层逻辑（看懂这个，彻底通透）：

```python
# ======================
# LangGraph 底层伪代码
# ======================
# 1. 检查点存储的中断状态（核心标记）
checkpoint = {
    "interrupted": False,   # 中断标记：第一次为False，第二次为True
    "resume_value": None    # 用户恢复时传入的值
}

# 2. 底层 interrupt 函数的真实实现（简化版）
def interrupt(context_data):
    # 核心判断：第二次执行时，checkpoint["interrupted"] = True
    if checkpoint["interrupted"]:
        # 直接返回用户值 → 跳过暂停！！！
        return checkpoint["resume_value"]
    
    # 第一次执行：走暂停逻辑
    checkpoint["interrupted"] = True  # 标记已中断
    save_checkpoint(checkpoint)       # 保存状态
    raise ExecutorPause()             # 执行器内部暂停（非业务异常）

# ======================
# 你的业务节点代码
# ======================
def wait_approval(state):
    print("节点执行")  # 两次都打印（因为节点重执行）
    # 第一次：暂停；第二次：直接返回用户值
    decision = interrupt({"task": "请审批"})
    return Command(goto="after_approval" if decision else "cancel_node")
```

伪代码执行效果：

- **第一次**：`interrupted=False` → 暂停，标记为`True`
- **第二次**：`interrupted=True` → 直接返回用户值，**跳过暂停**

---

#### 关键疑问精准解答

1. 为什么第二次执行节点，`interrupt` 能跳过暂停？
	不是 `interrupt` 函数有记忆，而是**执行器通过检查点的中断标记，给它开了「绿色通道」**，直接返回用户值，不执行暂停逻辑。

2. 为什么 `print` 会执行两次？
	LangGraph **不保存函数调用栈**，检查点只存「当前节点名」，恢复时必须**重新调用节点函数**，所以节点从头执行。

3. 底层是 `raise` 异常吗？是**执行器内部的暂停异常**，不是业务异常：

- 第一次执行：`raise` 暂停异常 → 工作流停止
- 第二次执行：**直接绕过异常逻辑** → 无暂停、无报错



### 1.8 访问 localhost:8000 显示 index.html 的完整流程解析

>[!tip] 核心前提
> 
> 你的 `app.py` 用的是 **FastAPI 框架**（默认端口 8000），并且**配置了静态文件服务**，这是能直接访问网页的根本原因。

案例采用的**FastAPI + 静态网页 + LangGraph**，这种部署流程如下：
#### app.py 里的关键代码

这是支撑整个流程的底层代码，我还原你项目的核心配置：

```python
# 1. 导入FastAPI和静态文件依赖
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# 2. 创建FastAPI应用实例
app = FastAPI(title="LangGraph中断审批演示")

# 3. 【核心】挂载静态文件目录（托管index.html、css、js）
# 告诉FastAPI：static文件夹里的文件可以直接通过网址访问
app.mount("/static", StaticFiles(directory="static"), name="static")

# 4. 【核心】根路由 / ：访问localhost:8000时，返回index.html
@app.get("/")
async def root():
    # 直接返回静态页面
    return FileResponse("static/index.html")

# 5. 你之前的LangGraph代码 + 接口
# 任务启动接口
@app.post("/api/start-task")
# 审批恢复接口
@app.post("/api/approve")
```


#### 完整运行流程

##### 阶段 1：执行 `python app.py` → 服务启动

1. Python 加载 `app.py` 所有代码；
2. 初始化 FastAPI 服务，监听 **本机 8000 端口**；
3. 编译 LangGraph 工作流（带中断、检查点）；
4. 注册两个核心服务：
    
    - 静态文件服务（托管 `static/index.html`）
    - API 接口服务（`/api/start-task`、`/api/approve`）
    
5. 控制台打印提示：`访问 http://localhost:8000 进行演示`

---

##### 阶段 2：浏览器打开 `http://localhost:8000` → 请求发送

1. 浏览器向 **本机 8000 端口** 发送一个 `GET /` 请求；
2. 请求到达 FastAPI 服务。

---

##### 阶段 3：FastAPI 处理请求 → 返回网页（关键！）

1. FastAPI 匹配路由：`GET /` 对应你写的 `root()` 函数；
2. 执行 `return FileResponse("static/index.html")`；
3. 后端把 `static` 文件夹里的 **index.html 源码**发送给浏览器；

---

##### 阶段 4：浏览器渲染页面 → 你看到界面

1. 浏览器接收 HTML 代码，解析、渲染；
2. 显示出人机协同审批的页面（按钮、输入框、状态展示）；
3. 页面加载完成，等待你点击「发起任务」触发 LangGraph 逻辑。

---

##### 阶段 5：页面交互 → 调用 LangGraph 中断 / 恢复（闭环）

这是前后端 + LangGraph 联动的完整逻辑：

1. 你点击页面按钮 → 前端 JS 调用 `/api/start-task`；
2. 后端执行 LangGraph 工作流 → 走到 `interrupt()` → 暂停；
3. 页面显示「等待审批」；
4. 你点击「同意 / 拒绝」→ 前端调用 `/api/approve`；
5. 后端从 `interrupt()` 断点恢复 → 执行完工作流；
6. 结果返回页面，页面更新状态。