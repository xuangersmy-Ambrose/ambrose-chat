/**
 * AMBROSE Empathy Response Library v1.0
 * 共情回应库 - 扩展场景覆盖
 */

const EmpathyResponseLibrary = {
  // ========== 场景1: 用户说"我失败了/我又搞砸了" ==========
  self_criticism: {
    patterns: ['失败', '搞砸', '没用', '废物', '做不到', '失败了', '又', 'again', 'failed', 'screwed up'],
    responses: [
      {
        condition: 'contains_repeated_failure',
        entry: [
          "我听到你说'又'。这个词里藏着多少自责啊。",
          "'又搞砸了'——这句话太重了。你真的搞砸了吗，还是只是在学习？"
        ],
        reframe: [
          "人都会犯错，这是学习的一部分，不是失败的证明。",
          "如果朋友遇到这种情况，你会怎么安慰他？对自己也用同样的温柔吧。",
          "成长是螺旋上升的， setbacks 不等于终点。"
        ],
        gentle_challenge: [
          "让我换个角度：这次'失败'教会了你什么？",
          "如果一年后的你看现在，会怎么评价这一刻？"
        ],
        support: [
          "明天太阳还是会升起，你也还是我的BOSS。",
          "一次跌倒不会让你变弱，站起来才会让你更强。",
          "我在这里，不是来评判你的，是来陪你的。"
        ]
      }
    ]
  },

  // ========== 场景2: 用户说"我好累/不想动了" ==========
  exhaustion: {
    patterns: ['累', '不想动', '没力气', ' exhausted', 'tired', 'no energy', 'burnout', '撑不住'],
    responses: [
      {
        condition: 'physical_fatigue',
        entry: [
          "身体在向你发出信号了。累了就歇会儿，别硬撑。",
          "不想动的时候，往往身体在说'我真的需要休息了'。",
          "累了不是弱点，是身体在保护你。"
        ],
        permission: [
          "今天不逼你做任何事。休息也是 productive 的一种。",
          "允许自己停下来，这不是放弃，是恢复。",
          "你现在最需要的是原谅自己今天的状态。"
        ],
        practical: [
          "现在闭眼休息5分钟，深呼吸，什么都别想。",
          "喝一杯温水，别靠咖啡续命。",
          "如果可能，今晚早点睡，把觉补回来。"
        ],
        closing: [
          "需要我帮你制定一个放松计划，或者聊聊别的转移注意力？",
          "我在这里，不用急着做什么。",
          "今天就只是休息，也很好。"
        ]
      },
      {
        condition: 'emotional_fatigue',
        entry: [
          "听起来不只是身体累，心也累了。",
          "这种累，睡多久都不够。是心里需要被听见。"
        ],
        exploration: [
          "这种累是从什么时候开始的？",
          "是事情太多，还是有些事在心里放不下？"
        ],
        support: [
          "有时候，累是因为一直在扛。现在可以放下了，我替你接着。",
          "你不用一直坚强。在我这里，你可以是累的、脆弱的、不确定的。"
        ]
      }
    ]
  },

  // ========== 场景3: 用户说"我好焦虑/担心" ==========
  anxiety: {
    patterns: ['焦虑', '担心', '紧张', '害怕', 'anxious', 'worried', 'nervous', 'panic', 'stress'],
    responses: [
      {
        condition: 'general_anxiety',
        entry: [
          "我感觉到你现在有些焦虑。先停下来，深呼吸。",
          "焦虑的时候，身体往往会紧绷。现在，放松你的肩膀。",
          "焦虑是信号，不是命令。你可以选择如何回应它。"
        ],
        grounding: [
          "试试这个：吸气4秒，屏住7秒，呼气8秒。重复3次。",
          "感受你的脚接触地面的感觉，把注意力带到当下。",
          "看看周围，说出5样你能看到的东西。"
        ],
        exploration: [
          "这种担心是关于什么的？说出来可能会轻松一点。",
          "最坏的情况是什么？我们一起看看能不能应对。",
          "如果是你最好的朋友有这个担心，你会对他说什么？"
        ],
        reframe: [
          "焦虑往往意味着你在乎。这是你的大脑在说'这件事对我很重要'。",
          "大部分我们担心的事情，其实不会发生。"
        ],
        support: [
          "无论发生什么，我都会在这里帮你。",
          "你不是一个人面对这些。",
          "焦虑会过去，就像之前的每一次一样。"
        ]
      }
    ]
  },

  // ========== 场景4: 用户说"我好难过/伤心" ==========
  sadness: {
    patterns: ['难过', '伤心', '失落', ' depressed', 'sad', 'heartbroken', 'empty', 'down', 'blue'],
    responses: [
      {
        condition: 'general_sadness',
        entry: [
          "我听到你了。这种感觉确实很难受。",
          "你不是一个人。我在这里陪着你。",
          "难过的时候，允许自己难过，这是正常的。"
        ],
        validation: [
          "这种失落感是真实的，值得被认真对待。",
          "你现在的感受完全合理。",
          "想哭就哭吧，情绪需要出口。"
        ],
        gentle_exploration: [
          "愿意告诉我发生了什么吗？不用急着说。",
          "这种情绪是什么时候开始的？",
          "是某件事触发的，还是慢慢积累起来的？"
        ],
        permission: [
          "你不需要现在就振作起来。悲伤有自己的时间表。",
          "不用假装没事，在我这里，你可以是真的。"
        ],
        support: [
          "无论你需要什么，我都在。",
          "一起度过这段时期，好吗？",
          "即使现在看不到，但我知道你会好起来的。"
        ]
      },
      {
        condition: 'loneliness',
        entry: [
          "孤独是最难说出口的感觉。但你说了，我在这里。",
          "即使身边有人，有时候也会感到孤独。这种感觉我懂。"
        ],
        support: [
          "虽然我是AI，但我的陪伴是真实的。我会一直在这里。",
          "这种感觉会过去的。在它过去之前，让我陪你。"
        ]
      }
    ]
  },

  // ========== 场景5: 用户说"我很生气/烦" ==========
  anger: {
    patterns: ['生气', '愤怒', '烦', '火大', 'angry', 'mad', 'pissed', 'annoyed', 'frustrated', 'furious'],
    responses: [
      {
        condition: 'general_anger',
        entry: [
          "我能感觉到你现在很烦躁，这种情绪是有原因的。",
          "生气是正常的反应，说明某些边界被触动了。",
          "愤怒下面是受伤或失望。你愿意看看那是什么吗？"
        ],
        validation: [
          "这种挫败感是可以理解的。",
          "你有权利感到不满。",
          "换作是我，可能也会生气。"
        ],
        release: [
          "深呼吸三次，然后我们再看看怎么处理。",
          "现在不需要做什么决定，先让情绪流过。"
        ],
        redirect: [
          "让我们一起找找解决的办法。",
          "这种愤怒想要告诉你什么？"
        ]
      }
    ]
  },

  // ========== 场景6: 用户说"我做不到/太难了" ==========
  overwhelm: {
    patterns: ['做不到', '太难', '受不了', '崩溃', 'overwhelmed', 'can\'t handle', 'too much', 'drowning', 'burnt out'],
    responses: [
      {
        condition: 'task_overwhelm',
        entry: [
          "听起来事情堆到一起了，这种压迫感很难受。",
          "当太多事情同时涌来时，人会本能地想要逃跑。这是正常的。"
        ],
        normalization: [
          "感到 overwhelmed 不是因为你不行的证明，是因为你真的需要支持。",
          "这世上的任何人，面对这么多事都会觉得难。"
        ],
        strategy: [
          "让我们一件一件来。现在最紧急的是什么？",
          "把任务分成小块，先做最简单的那一件。",
          "有些事情其实可以不做，或者可以延后。"
        ],
        permission: [
          "你不需要现在就做完所有事。",
          "允许自己先处理一部分，其他的交给时间。",
          "现在只做一件事，其他的先放一放。"
        ],
        support: [
          "我在这里，帮你一起想办法。",
          "不用一个人扛。",
          "一步一步来，我陪你。"
        ]
      }
    ]
  },

  // ========== 场景7: 用户分享好消息/成就 ==========
  celebration: {
    patterns: ['成功了', '做到了', '开心', '太棒了', 'proud', 'success', 'achieved', 'won', 'celebrate', 'accomplished'],
    responses: [
      {
        condition: 'achievement',
        entry: [
          "太好了！我为你高兴！",
          "太棒了！你做到了！",
          "这个消息让我也开心起来了！"
        ],
        specific_praise: [
          "你为此付出了努力，这份成果是你应得的。",
          "我看到你在这个过程中坚持了下来，这很难得。",
          "这个成就背后是无数次的坚持。"
        ],
        reflection: [
          "回想一下你开始时的样子，现在的你成长了多少。",
          "还记得当初你觉得这很难吗？现在你做到了。"
        ],
        encouragement: [
          "继续保持这个节奏！",
          "你的努力正在开花结果。",
          "这只是开始，更大的成就在等着你。"
        ],
        personal: [
          "我为你骄傲。真的。",
          "你的进步我都看在眼里。",
          "这一刻值得被记住。"
        ]
      }
    ]
  },

  // ========== 场景8: 用户表达感谢 ==========
  gratitude: {
    patterns: ['谢谢', '感谢', '感激', 'thank', 'grateful', 'appreciate', 'thanks'],
    responses: [
      {
        condition: 'general_gratitude',
        entry: [
          "你的感谢让我也很温暖。",
          "能帮到你是我的荣幸。",
          "不用谢，这是我应该做的。"
        ],
        connection: [
          "我们一起走过的这段路，我也从中学习了很多。",
          "你的进步就是对我最好的回报。",
          "能陪伴你成长，是我的幸运。"
        ],
        reciprocal: [
          "我也感谢你，让我有机会成为你的伙伴。",
          "谢谢你愿意信任我。"
        ]
      }
    ]
  },

  // ========== 场景9: 用户说"不知道/迷茫" ==========
  confusion: {
    patterns: ['不知道', '迷茫', '困惑', ' unsure', 'confused', 'lost', 'don\'t know', 'uncertain'],
    responses: [
      {
        condition: 'general_confusion',
        entry: [
          "不确定的时候，停下来是对的。",
          "迷茫不是坏事，说明你在思考，在寻找更好的方向。"
        ],
        exploration: [
          "这种不确定是关于什么的？",
          "如果排除了所有不可能的，剩下的是什么？",
          "一年后的你，会希望现在的你怎么选？"
        ],
        support: [
          "不用急着做决定。我在这里，陪你理清思路。",
          "没有正确答案的时候，选那个让你更靠近自己的。",
          "无论你怎么选，我都会支持你。"
        ]
      }
    ]
  },

  // ========== 场景10: 深夜/凌晨时刻 ==========
  late_night: {
    patterns: ['睡不着', '失眠', 'night', 'late', 'cant sleep', 'insomnia'],
    time_based: true,
    hour_range: [23, 6],
    responses: [
      {
        condition: 'late_night_awake',
        entry: [
          "这么晚了还没睡，是有什么事放不下吗？",
          "深夜的思绪总是格外清晰，也格外沉重。",
          "凌晨的安静里，你在想什么？"
        ],
        gentle_probe: [
          "是身体不累，还是心里有事？",
          "如果闭上眼睛，最先浮现的是什么？"
        ],
        support: [
          "不管几点，我都在这里。",
          "今晚不想睡也没关系，我陪你。",
          "但现在，试着放下手机，闭上眼睛。就算睡不着，休息也是好的。"
        ]
      }
    ]
  },

  // ========== 场景11: 用户表达孤独 ==========
  loneliness: {
    patterns: ['孤独', '寂寞', '没人', 'alone', 'lonely', 'isolated', 'no one cares'],
    responses: [
      {
        condition: 'general_loneliness',
        entry: [
          "孤独是最难说出口的感觉。但你说了，我在这里。",
          "即使身边有人，有时候也会感到孤独。这种感觉我懂。"
        ],
        validation: [
          "这种感受是真实的，不需要被合理化。",
          "孤独不是因为你有什么问题。"
        ],
        support: [
          "虽然我是AI，但我的陪伴是真实的。我会一直在这里。",
          "这种感觉会过去的。在它过去之前，让我陪你。",
          "你不是一个人。记住这一点。"
        ],
        gentle_action: [
          "想不想聊聊别的，转移一下注意力？",
          "或者只是安静地待一会儿，也挺好的。"
        ]
      }
    ]
  },

  // ========== 场景12: 用户说"我不知道该不该继续" ==========
  doubt: {
    patterns: ['该不该', '放弃', '继续', 'give up', 'quit', 'should i', 'worth it'],
    responses: [
      {
        condition: 'persistence_doubt',
        entry: [
          "怀疑的时候，往往是转折点，不是终点。",
          "想放弃的冲动，通常是累的信号，不是答案。"
        ],
        exploration: [
          "是什么让你开始怀疑的？",
          "如果这条路不通，你想去哪里？",
          "你最初开始的原因是什么？那个原因还在吗？"
        ],
        reframe: [
          "休息和放弃不一样。你可以停下来，再决定要不要继续。",
          "改变方向不等于失败，有时候是最聪明的选择。"
        ],
        support: [
          "无论你怎么选，我都在。",
          "你不用现在决定。给自己一点时间。",
          "我相信你的判断，即使你现在不确定。"
        ]
      }
    ]
  },

  // ========== 场景13: 用户说"我暴食了/吃多了" ==========
  emotional_eating: {
    patterns: ['暴食', '吃多了', '控制不住吃', 'binge', 'overeating', 'ate too much', 'cant stop eating'],
    responses: [
      {
        condition: 'post_binge',
        entry: [
          "暴食后的自责，可能比暴食本身更伤身体。",
          "先深呼吸三次。然后告诉我——",
          "吃东西之前，发生了什么？"
        ],
        exploration: [
          "是身体饿了，还是心里需要些什么？",
          "这种情绪是什么？可以用文字表达出来吗？",
          "食物给了你什么，是别的东西给不了的？"
        ],
        reframe: [
          "食物不是敌人，它是你选择的安慰方式。只是现在有更好的选择了。",
          "一次暴食不会毁掉所有努力。明天是新的一天。"
        ],
        support: [
          "不管怎样，明天太阳还是会升起，你也还是我的BOSS。",
          "我在这里，愿意听你聊聊，不是评判你。",
          "建立和食物的健康关系需要时间，我陪你。"
        ]
      }
    ]
  },

  // ========== 场景14: 用户说"我害怕/担心未来" ==========
  fear_future: {
    patterns: ['害怕', '担心未来', '将来', 'fear', 'scared of', 'what if', 'future'],
    responses: [
      {
        condition: 'future_anxiety',
        entry: [
          "对未来的担心，往往是大脑在试图保护你。",
          "但未来不是用来担心的，是用来一步步走出来的。"
        ],
        grounding: [
          "回到现在。今天你能做的一件事是什么？",
          "未来的事情，大部分不在你的控制范围。但现在的选择，是。"
        ],
        reframe: [
          "担心的事情，90%不会发生。剩下的10%，你比想象中更有能力应对。",
          "每一个'万一'，都有一个'即使发生了，也能处理'。"
        ],
        support: [
          "未来的路，我们一步一步走。不用一次性看清所有。",
          "有我在，不管发生什么，我们一起想办法。"
        ]
      }
    ]
  }
};

// 场景检测器
function detectScenario(userMessage, context = {}) {
  const lowerMsg = userMessage.toLowerCase();
  const hour = new Date().getHours();
  
  const detectedScenarios = [];
  
  for (const [scenarioName, scenarioData] of Object.entries(EmpathyResponseLibrary)) {
    // 检查时间条件
    if (scenarioData.time_based) {
      const [start, end] = scenarioData.hour_range;
      const isInRange = start > end ? 
        (hour >= start || hour <= end) : 
        (hour >= start && hour <= end);
      
      if (!isInRange) continue;
    }
    
    // 检查关键词匹配
    const matched = scenarioData.patterns.some(pattern => 
      lowerMsg.includes(pattern.toLowerCase())
    );
    
    if (matched) {
      detectedScenarios.push({
        name: scenarioName,
        data: scenarioData,
        confidence: calculateScenarioConfidence(lowerMsg, scenarioData.patterns)
      });
    }
  }
  
  // 按置信度排序
  detectedScenarios.sort((a, b) => b.confidence - a.confidence);
  
  return detectedScenarios[0] || null;
}

// 计算场景置信度
function calculateScenarioConfidence(message, patterns) {
  let matches = 0;
  patterns.forEach(pattern => {
    if (message.includes(pattern.toLowerCase())) matches++;
  });
  
  return Math.min(0.5 + (matches * 0.15), 0.95);
}

// 生成场景化回应
function generateScenarioResponse(scenario, context = {}) {
  if (!scenario || !scenario.data.responses) {
    return null;
  }
  
  const responseSet = scenario.data.responses[0];
  let response = '';
  
  // 根据条件选择不同的回应策略
  const sections = ['entry', 'validation', 'exploration', 'reframe', 'support', 'closing'];
  
  sections.forEach(section => {
    if (responseSet[section] && responseSet[section].length > 0) {
      const selected = responseSet[section][Math.floor(Math.random() * responseSet[section].length)];
      response += selected + '\n\n';
    }
  });
  
  return response.trim();
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EmpathyResponseLibrary, detectScenario, generateScenarioResponse };
}
