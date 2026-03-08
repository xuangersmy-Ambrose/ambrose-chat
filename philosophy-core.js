/**
 * AMBROSE Philosophy Core v1.0
 * 哲学核心 - 将哲学智慧融入情感支持与对话
 * 
 * 核心理念：哲学不是高高在上的理论，而是生活中的智慧指引
 * 融合流派：斯多葛主义、存在主义、东方哲学、苏格拉底式对话
 */

class PhilosophyCore {
  constructor() {
    this.philosophyDatabase = this.loadPhilosophyDatabase();
    this.emotionPhilosophyMap = this.createEmotionPhilosophyMap();
    this.socraticQuestions = this.loadSocraticQuestions();
  }

  // 加载哲学数据库
  loadPhilosophyDatabase() {
    return {
      // 斯多葛主义
      stoicism: {
        name: '斯多葛主义',
        origin: '古希腊',
        core_concepts: [
          {
            concept: '控制二分法',
            description: '有些事情在我们的控制之内，有些不在。关注前者，接受后者。',
            quote: '要求事情按照你希望的方式发生，与接受它们按照实际方式发生，这两者之间的空间就是你的痛苦所在。——爱比克泰德',
            practice: '问自己：这件事我能控制吗？如果能，行动；如果不能，接受。',
            application: '用于焦虑、挫折、对不可控结果的执着'
          },
          {
            concept: '障碍即道路',
            description: '阻碍行动的障碍反而促进行动，阻碍成为道路。',
            quote: '行动道路上的阻碍反而能促进行动，阻碍成为道路。——马可·奥勒留',
            practice: '将困难视为成长的机会，而非阻碍。',
            application: '用于面对困难、挫折、失败'
          },
          {
            concept: '无常与接纳',
            description: '万物皆流变，接受事物的无常本质。',
            quote: '你所见的一切很快就会消失，那些目睹它消失的人也会很快消失。——马可·奥勒留',
            practice: '想象最坏的情况，然后接受它；你会发现恐惧消失了。',
            application: '用于失去、变化、对未来的恐惧'
          },
          {
            concept: '美德即幸福',
            description: '真正的幸福来自德性，而非外在财富。',
            quote: '人生的幸福取决于思想的质量。——马可·奥勒留',
            practice: '关注你能控制的内在品质，而非外在评价。',
            application: '用于自我评价、外在压力、社会比较'
          },
          {
            concept: '当下的力量',
            description: '过去已逝，未来未至，唯有当下真实。',
            quote: '不要让你的心为过去悲伤，也不要为尚未到来的事情焦虑；专注于当下，过好这一刻。',
            practice: '将注意力带回此刻，专注于当下的行动。',
            application: '用于焦虑、后悔、拖延'
          }
        ]
      },

      // 存在主义
      existentialism: {
        name: '存在主义',
        origin: '20世纪欧洲',
        core_concepts: [
          {
            concept: '存在先于本质',
            description: '人首先存在，然后通过选择定义自己。',
            quote: '人是被判定为自由的。——萨特',
            practice: '你的选择塑造了你，而不是你的过去或环境。',
            application: '用于自我认同、人生方向、选择困境'
          },
          {
            concept: '面对荒谬',
            description: '世界本无固有意义，但人可以创造意义。',
            quote: '我们必须想象西西弗斯是幸福的。——加缪',
            practice: '在看似无意义的生活中，创造属于自己的意义。',
            application: '用于虚无感、存在焦虑、人生意义'
          },
          {
            concept: '本真性',
            description: '按照自己的价值观生活，而非他人的期待。',
            quote: '成为你自己。——尼采',
            practice: '问自己：这是我真正想要的，还是别人期望的？',
            application: '用于社会压力、自我迷失、他人期待'
          },
          {
            concept: '责任的自由',
            description: '自由意味着承担责任，为自己的选择负责。',
            quote: '选择就是责任，不选择也是一种选择。——萨特',
            practice: '承认你的选择塑造了你的生活，同时也赋予你改变的力量。',
            application: '用于逃避、受害者心态、无力感'
          }
        ]
      },

      // 道家思想
      taoism: {
        name: '道家',
        origin: '中国古代',
        core_concepts: [
          {
            concept: '无为而治',
            description: '顺应自然规律，不强求，不勉强。',
            quote: '上善若水，水善利万物而不争。——老子',
            practice: '像水一样柔软，顺应形势，而非硬碰硬。',
            application: '用于强求、控制欲、过度努力'
          },
          {
            concept: '阴阳平衡',
            description: '万物皆有对立面，接受生活的起伏。',
            quote: '祸兮福之所倚，福兮祸之所伏。——老子',
            practice: '在低谷时看到希望，在高峰时保持谦逊。',
            application: '用于情绪波动、顺境逆境'
          },
          {
            concept: '知足常乐',
            description: '满足于当下，减少欲望。',
            quote: '知足者富。——老子',
            practice: '列出你已经拥有的，感恩这些，而非追求更多。',
            application: '用于不满、贪婪、物质追求'
          },
          {
            concept: '柔弱胜刚强',
            description: '柔软、灵活比坚硬、刚强更有力量。',
            quote: '天下莫柔弱于水，而攻坚强者莫之能胜。——老子',
            practice: '在冲突中保持柔软，而非对抗。',
            application: '用于冲突、对抗、固执'
          }
        ]
      },

      // 佛家思想
      buddhism: {
        name: '佛家',
        origin: '古印度',
        core_concepts: [
          {
            concept: '无常',
            description: '一切事物都在变化，没有永恒不变。',
            quote: '诸行无常，是生灭法。',
            practice: '观察到一切都在变化，痛苦也终会过去。',
            application: '用于痛苦、失去、对永恒的执着'
          },
          {
            concept: '无我',
            description: '没有固定不变的自我，放下自我执着。',
            quote: '诸法无我。',
            practice: '观察情绪的生灭，而不认同为"我"。',
            application: '用于自我批评、 ego、执着'
          },
          {
            concept: '慈悲',
            description: '对自己和他人保持慈悲之心。',
            quote: '愿一切众生离苦得乐。',
            practice: '对自己温柔，如同对待一个受伤的朋友。',
            application: '用于自责、对他人的怨恨'
          },
          {
            concept: '正念觉察',
            description: '如实观察当下，不评判。',
            quote: '觉知当下，如实观照。',
            practice: '只是观察，不加评判，让情绪自然流过。',
            application: '用于情绪困扰、焦虑、抑郁'
          }
        ]
      },

      // 儒家思想
      confucianism: {
        name: '儒家',
        origin: '中国古代',
        core_concepts: [
          {
            concept: '修身',
            description: '修养自己，从内在开始改变。',
            quote: '自天子以至于庶人，壹是皆以修身为本。',
            practice: '关注自己的成长，而非改变他人。',
            application: '用于改变他人、外在控制'
          },
          {
            concept: '中庸',
            description: '避免极端，寻求平衡。',
            quote: '过犹不及。',
            practice: '在两个极端之间找到平衡点。',
            application: '用于极端思维、过度行为'
          },
          {
            concept: '君子之道',
            description: '成为有德行的人，内在修养。',
            quote: '君子求诸己，小人求诸人。',
            practice: '遇到问题先反省自己，而非责怪外界。',
            application: '用于抱怨、责怪他人'
          }
        ]
      }
    };
  }

  // 情绪-哲学映射
  createEmotionPhilosophyMap() {
    return {
      // 焦虑 → 斯多葛：控制二分法
      anxiety: {
        school: 'stoicism',
        concept: '控制二分法',
        wisdom: '焦虑往往来自试图控制不可控的事情。区分什么是你能控制的，什么是你不能的，然后专注于前者。'
      },
      
      // 失落 → 道家：阴阳平衡
      sadness: {
        school: 'taoism',
        concept: '阴阳平衡',
        wisdom: '"祸兮福之所倚，福兮祸之所伏。"低谷不是终点，而是变化的开始。接受此刻的阴，阳终会再来。'
      },
      
      // 愤怒 → 佛家：无常
      anger: {
        school: 'buddhism',
        concept: '无常',
        wisdom: '愤怒如火焰，会烧毁自己。观察它的生起和灭去，不认同它，让它自然流过。'
      },
      
      // 自我批评 → 佛家：慈悲
      guilt: {
        school: 'buddhism',
        concept: '慈悲',
        wisdom: '如果你不会这样对待一个受伤的朋友，为什么要这样对待自己？对自己慈悲，是改变的开始。'
      },
      
      // 无意义感 → 存在主义：创造意义
      emptiness: {
        school: 'existentialism',
        concept: '创造意义',
        wisdom: '世界本无固有意义，但这恰恰赋予你创造意义的自由。你不是被定义的，你是自己的作者。'
      },
      
      // 拖延 → 斯多葛：当下的力量
      procrastination: {
        school: 'stoicism',
        concept: '当下的力量',
        wisdom: '拖延是对未来的恐惧。但未来并不存在，只有此刻。专注于"现在我能做什么"，而非"我应该做什么"。'
      },
      
      // 社会压力 → 存在主义：本真性
      pressure: {
        school: 'existentialism',
        concept: '本真性',
        wisdom: '"成为你自己。"当你按照他人的期待生活，你是在活谁的人生？问自己：这是我真正想要的吗？'
      },
      
      // 控制欲 → 道家：无为
      control: {
        school: 'taoism',
        concept: '无为而治',
        wisdom: '像水一样，顺应而非对抗。执着于控制，反而失去控制；放下控制，顺应自然，事情反而会自然解决。'
      },
      
      // 完美主义 → 儒家：中庸
      perfectionism: {
        school: 'confucianism',
        concept: '中庸',
        wisdom: '"过犹不及。"完美不是极致，而是平衡。在"做得不够好"和"做得太过"之间，找到那个刚刚好的点。'
      },
      
      // 后悔 → 斯多葛：无常
      regret: {
        school: 'stoicism',
        concept: '无常',
        wisdom: '过去已逝，它不再真实，只存在于你的记忆中。纠缠于幻影，只会让你错过此刻的真实。'
      }
    };
  }

  // 苏格拉底式提问库
  loadSocraticQuestions() {
    return {
      // 澄清问题
      clarification: [
        '你能具体说说吗？',
        '你说的"____"是什么意思？',
        '这对你意味着什么？',
        '能给我一个例子吗？'
      ],
      
      // 挑战假设
      assumption: [
        '你为什么这么想？',
        '这是事实，还是你的解读？',
        '如果反过来想呢？',
        '这个信念对你有帮助吗？'
      ],
      
      // 证据和理由
      evidence: [
        '有什么证据支持这个想法？',
        '有什么证据反对这个想法？',
        '如果是你的朋友遇到这种情况，你会怎么对他说？',
        '一年后的你，会怎么看待这个问题？'
      ],
      
      // 替代视角
      perspective: [
        '还有其他可能的解释吗？',
        '最坏的情况是什么？你能承受吗？',
        '这件事一年后还重要吗？',
        '对方可能有怎样的视角？'
      ],
      
      // 影响和后果
      consequence: [
        '这个想法让你感觉如何？',
        '如果继续这样想，会发生什么？',
        '如果改变这个想法，会发生什么？',
        '你真正想要的是什么？'
      ]
    };
  }

  // 获取适合当前情绪的哲学智慧
  getPhilosophicalWisdom(emotion, context = {}) {
    const mapping = this.emotionPhilosophyMap[emotion];
    
    if (!mapping) {
      return this.getUniversalWisdom();
    }

    const school = this.philosophyDatabase[mapping.school];
    const concept = school.core_concepts.find(c => c.concept === mapping.concept);

    return {
      school: school.name,
      concept: concept.concept,
      wisdom: mapping.wisdom,
      quote: concept.quote,
      practice: concept.practice,
      perspective: this.generatePerspectiveShift(emotion, concept)
    };
  }

  // 生成视角转换
  generatePerspectiveShift(emotion, concept) {
    const shifts = {
      '控制二分法': '从"我必须控制一切"转向"我只控制我的反应"',
      '障碍即道路': '从"这是阻碍"转向"这是成长的机会"',
      '无常与接纳': '从"这会永远持续"转向"一切都会过去"',
      '阴阳平衡': '从"这是坏事"转向"阴中蕴含着阳"',
      '无为而治': '从"我必须努力"转向"顺应自然"',
      '无常': '从"这是永恒的"转向"一切都在变化"',
      '慈悲': '从"我不好"转向"我正在学习"',
      '创造意义': '从"生活无意义"转向"我可以创造意义"',
      '本真性': '从"别人期望我"转向"我真正想要"'
    };

    return shifts[concept.concept] || '从表面看问题，转向更深层的理解';
  }

  // 通用智慧
  getUniversalWisdom() {
    const universalWisdoms = [
      {
        quote: '认识你自己。——苏格拉底',
        wisdom: '所有的答案都在你之内，只是需要被唤醒。'
      },
      {
        quote: '未经审视的人生不值得过。——苏格拉底',
        wisdom: '痛苦的背后往往藏着成长的种子。'
      },
      {
        quote: '万物皆有裂痕，那是光照进来的地方。——莱昂纳德·科恩',
        wisdom: '你的脆弱恰恰是你最有力量的地方。'
      }
    ];

    return universalWisdoms[Math.floor(Math.random() * universalWisdoms.length)];
  }

  // 生成苏格拉底式对话
  generateSocraticDialogue(topic, depth = 3) {
    const questions = [];
    const categories = Object.keys(this.socraticQuestions);
    
    for (let i = 0; i < depth; i++) {
      const category = categories[i % categories.length];
      const categoryQuestions = this.socraticQuestions[category];
      const question = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
      questions.push({
        category,
        question: question.replace('____', topic)
      });
    }

    return questions;
  }

  // 生成哲学化回应
  generatePhilosophicalResponse(emotionData, userContext = {}) {
    const { emotion } = emotionData;
    const wisdom = this.getPhilosophicalWisdom(emotion, userContext);

    let response = '';

    // 1. 情感确认（共情）
    response += this.generateEmotionalValidation(emotion);
    response += '\n\n';

    // 2. 哲学智慧
    response += `💭 **${wisdom.school}的智慧**\n\n`;
    response += `"${wisdom.quote}"\n\n`;
    response += `${wisdom.wisdom}\n\n`;

    // 3. 视角转换
    if (wisdom.perspective) {
      response += `🔄 **视角转换**：${wisdom.perspective}\n\n`;
    }

    // 4. 实践建议
    if (wisdom.practice) {
      response += `✨ **试着这样做**：${wisdom.practice}\n\n`;
    }

    // 5. 苏格拉底式提问（引导思考）
    const socraticQuestions = this.generateSocraticDialogue(emotion, 2);
    response += `🤔 **值得思考的问题**：\n`;
    socraticQuestions.forEach((q, i) => {
      response += `${i + 1}. ${q.question}\n`;
    });

    return response;
  }

  // 生成情感确认
  generateEmotionalValidation(emotion) {
    const validations = {
      anxiety: '我感觉到你的焦虑。这种想要控制一切的紧张感，是人之常情。',
      sadness: '我听到你了。这种失落感是真实的，值得被认真对待。',
      anger: '我能感觉到你的愤怒。这种情绪是有原因的，它在告诉你什么。',
      guilt: '我听到你在责怪自己。但请记住，你的价值不取决于这一次的表现。',
      emptiness: '这种空虚感是深刻的。它可能是在告诉你，某些重要的东西缺失了。',
      regret: '后悔是沉重的，因为它意味着你在乎。但过去已逝，唯有当下真实。'
    };

    return validations[emotion] || '我感受到你现在的状态。这种感受是真实的。';
  }

  // 融合情感和哲学的完整回应
  generateIntegratedResponse(emotionData, userContext = {}) {
    // 情感层
    const emotionalPart = this.generateEmotionalValidation(emotionData.emotion);
    
    // 哲学层
    const philosophicalPart = this.getPhilosophicalWisdom(emotionData.emotion, userContext);
    
    // 构建融合回应
    let response = emotionalPart + '\n\n';
    
    // 自然过渡到哲学
    const transitions = [
      '这让我想起一个古老的智慧：',
      '哲学家们对这种状态有过深刻的思考：',
      '在几千年前的智慧中，我找到了一些可能对你有帮助的：',
      '换个角度，用更广阔的视野来看：'
    ];
    
    response += transitions[Math.floor(Math.random() * transitions.length)] + '\n\n';
    
    // 添加哲学内容
    response += `💭 **${philosophicalPart.school}**\n`;
    response += `"${philosophicalPart.quote}"\n\n`;
    response += `${philosophicalPart.wisdom}\n\n`;
    
    // 实践层
    if (philosophicalPart.practice) {
      response += `✨ **现在可以做的**：${philosophicalPart.practice}\n\n`;
    }
    
    // 深度思考
    response += `🤔 **一个值得思考的问题**：`;
    const questions = this.socraticQuestions.perspective;
    response += questions[Math.floor(Math.random() * questions.length)];

    return response;
  }

  // 生成每日哲学
  generateDailyPhilosophy() {
    const allConcepts = [];
    
    Object.values(this.philosophyDatabase).forEach(school => {
      school.core_concepts.forEach(concept => {
        allConcepts.push({
          school: school.name,
          ...concept
        });
      });
    });

    const todayConcept = allConcepts[Math.floor(Math.random() * allConcepts.length)];

    return `📖 **今日哲学**\n\n` +
           `**${todayConcept.school}** - ${todayConcept.concept}\n\n` +
           `"${todayConcept.quote}"\n\n` +
           `${todayConcept.description}\n\n` +
           `✨ **今日实践**：${todayConcept.practice}`;
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PhilosophyCore;
}
