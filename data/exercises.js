/**
 * AMBROSE Health - 训练动作库
 * 参考Keep，收录标准训练动作
 */

const EXERCISE_DATABASE = {
  // ========== 热身 ==========
  warmup: [
    { id: 'warmup_001', name: '颈部环绕', emoji: '🔄', duration: 30, difficulty: '初级', target: '颈部', equipment: '无', calories: 5, description: '缓慢转动颈部，顺时针和逆时针各15秒' },
    { id: 'warmup_002', name: '肩部环绕', emoji: '🔄', duration: 30, difficulty: '初级', target: '肩部', equipment: '无', calories: 8, description: '双臂伸直，向前向后画大圈' },
    { id: 'warmup_003', name: '开合跳', emoji: '⭐', duration: 60, difficulty: '初级', target: '全身', equipment: '无', calories: 50, description: '双脚并拢站立，跳起时双脚分开，双手头上击掌' },
    { id: 'warmup_004', name: '高抬腿', emoji: '🦵', duration: 45, difficulty: '初级', target: '腿部', equipment: '无', calories: 45, description: '原地快速抬腿，膝盖尽量抬高至腰部' },
    { id: 'warmup_005', name: '手臂画圈', emoji: '🔄', duration: 30, difficulty: '初级', target: '手臂', equipment: '无', calories: 10, description: '双臂侧平举，向前向后画小圈' },
    { id: 'warmup_006', name: '原地慢跑', emoji: '🏃', duration: 60, difficulty: '初级', target: '全身', equipment: '无', calories: 60, description: '原地轻松慢跑，逐渐提高心率' },
    { id: 'warmup_007', name: '髋部环绕', emoji: '🔄', duration: 30, difficulty: '初级', target: '髋部', equipment: '无', calories: 8, description: '双手叉腰，髋部顺时针和逆时针画圈' },
    { id: 'warmup_008', name: '侧弓步拉伸', emoji: '🦵', duration: 40, difficulty: '初级', target: '腿部', equipment: '无', calories: 15, description: '向侧方迈一大步下蹲，拉伸大腿内侧' },
  ],
  
  // ========== 有氧运动 ==========
  cardio: [
    { id: 'cardio_001', name: '原地快跑', emoji: '🔥', duration: 60, difficulty: '中级', target: '心肺+腿部', equipment: '无', calories: 100, description: '原地以最快速度跑，膝盖抬高' },
    { id: 'cardio_002', name: '波比跳', emoji: '💥', reps: 15, sets: 3, difficulty: '高级', target: '全身', equipment: '无', calories: 150, description: '从站立→下蹲→俯卧撑→收腿→跳起' },
    { id: 'cardio_003', name: '登山者', emoji: '⛰️', duration: 45, difficulty: '中级', target: '核心+心肺', equipment: '无', calories: 80, description: '俯卧撑姿势，双腿交替向前收腿' },
    { id: 'cardio_004', name: '跳绳', emoji: '🪢', duration: 180, difficulty: '中级', target: '全身', equipment: '跳绳', calories: 300, description: '保持节奏连续跳跃' },
    { id: 'cardio_005', name: '滑冰跳', emoji: '⛸️', duration: 45, difficulty: '中级', target: '腿部+心肺', equipment: '无', calories: 90, description: '侧向跳跃，像滑冰一样' },
    { id: 'cardio_006', name: '深蹲跳', emoji: '⬆️', reps: 15, sets: 3, difficulty: '中级', target: '腿部+心肺', equipment: '无', calories: 120, description: '深蹲后用力向上跳起' },
    { id: 'cardio_007', name: '踢臀跑', emoji: '🏃', duration: 60, difficulty: '初级', target: '腿部', equipment: '无', calories: 70, description: '原地跑，脚跟触碰臀部' },
    { id: 'cardio_008', name: '交替触脚', emoji: '👇', duration: 60, difficulty: '中级', target: '核心+心肺', equipment: '无', calories: 85, description: '开合跳变式，双手交替触碰对侧脚尖' },
    { id: 'cardio_009', name: '侧向跑', emoji: '➡️', duration: 60, difficulty: '初级', target: '腿部', equipment: '无', calories: 75, description: '快速侧向移动，保持低重心' },
    { id: 'cardio_010', name: '星跳', emoji: '⭐', reps: 20, sets: 3, difficulty: '中级', target: '全身', equipment: '无', calories: 100, description: '下蹲后跳起，四肢展开成星形' },
    { id: 'cardio_011', name: '交叉跳', emoji: '❌', duration: 60, difficulty: '中级', target: '心肺', equipment: '无', calories: 90, description: '跳起时双腿交叉，落地还原' },
    { id: 'cardio_012', name: '箱跳', emoji: '📦', reps: 12, sets: 3, difficulty: '高级', target: '腿部+爆发力', equipment: '跳箱/台阶', calories: 120, description: '双脚跳上箱子或台阶' },
  ],
  
  // ========== 力量-胸部 ==========
  chest: [
    { id: 'chest_001', name: '标准俯卧撑', emoji: '💪', reps: 15, sets: 3, difficulty: '初级', target: '胸大肌', equipment: '无', calories: 50, description: '双手略宽于肩，身体保持一条直线' },
    { id: 'chest_002', name: '宽距俯卧撑', emoji: '💪', reps: 12, sets: 3, difficulty: '中级', target: '胸大肌(外侧)', equipment: '无', calories: 55, description: '双手间距约为肩宽的1.5倍' },
    { id: 'chest_003', name: '窄距俯卧撑', emoji: '💎', reps: 10, sets: 3, difficulty: '中级', target: '胸大肌(内侧)+三头', equipment: '无', calories: 55, description: '双手间距与肩同宽或更窄' },
    { id: 'chest_004', name: '下斜俯卧撑', emoji: '⬇️', reps: 12, sets: 3, difficulty: '中级', target: '上胸', equipment: '椅子/床', calories: 60, description: '双脚垫高，双手撑地做俯卧撑' },
    { id: 'chest_005', name: '上斜俯卧撑', emoji: '⬆️', reps: 15, sets: 3, difficulty: '初级', target: '下胸', equipment: '椅子/桌子', calories: 45, description: '双手垫高，降低难度' },
    { id: 'chest_006', name: '钻石俯卧撑', emoji: '💎', reps: 8, sets: 3, difficulty: '高级', target: '三头肌', equipment: '无', calories: 60, description: '双手食指拇指相触成钻石形' },
    { id: 'chest_007', name: '击掌俯卧撑', emoji: '👏', reps: 8, sets: 3, difficulty: '高级', target: '爆发力', equipment: '无', calories: 70, description: '推起时在胸前击掌' },
    { id: 'chest_008', name: '单腿俯卧撑', emoji: '🦵', reps: 10, sets: 3, difficulty: '高级', target: '胸+核心', equipment: '无', calories: 65, description: '一条腿抬起，保持平衡做俯卧撑' },
    { id: 'chest_009', name: '慢速俯卧撑', emoji: '🐌', reps: 8, sets: 3, difficulty: '中级', target: '胸大肌', equipment: '无', calories: 55, description: '下压3秒，推起3秒' },
    { id: 'chest_010', name: '弹力带夹胸', emoji: '🔴', reps: 15, sets: 3, difficulty: '初级', target: '胸大肌(中缝)', equipment: '弹力带', calories: 40, description: '双手握弹力带，胸前夹紧' },
  ],
  
  // ========== 力量-背部 ==========
  back: [
    { id: 'back_001', name: '引体向上', emoji: '🆙', reps: 8, sets: 3, difficulty: '高级', target: '背阔肌', equipment: '单杠', calories: 80, description: '正握单杠，下巴过杆' },
    { id: 'back_002', name: '反向划船', emoji: '⬅️', reps: 12, sets: 3, difficulty: '中级', target: '中背部', equipment: '桌子/低杠', calories: 55, description: '仰卧拉向固定物' },
    { id: 'back_003', name: '超人式', emoji: '🦸', reps: 15, sets: 3, difficulty: '初级', target: '下背', equipment: '无', calories: 30, description: '俯卧，同时抬起手臂和腿' },
    { id: 'back_004', name: 'Y字举', emoji: 'Y', reps: 12, sets: 3, difficulty: '初级', target: '上背', equipment: '无', calories: 25, description: '俯卧，手臂成Y字抬起' },
    { id: 'back_005', name: 'T字举', emoji: 'T', reps: 12, sets: 3, difficulty: '初级', target: '中背', equipment: '无', calories: 25, description: '俯卧，手臂成T字抬起' },
    { id: 'back_006', name: 'W字举', emoji: 'W', reps: 12, sets: 3, difficulty: '初级', target: '肩胛', equipment: '无', calories: 25, description: '俯卧，手臂成W字抬起' },
    { id: 'back_007', name: '俯身划船', emoji: '🚣', reps: 12, sets: 3, difficulty: '中级', target: '背部', equipment: '哑铃/水瓶', calories: 50, description: '俯身，向腹部拉重物' },
    { id: 'back_008', name: '直臂下压', emoji: '⬇️', reps: 15, sets: 3, difficulty: '初级', target: '背阔肌', equipment: '弹力带', calories: 35, description: '直臂向下拉弹力带' },
    { id: 'back_009', name: '门框拉伸', emoji: '🚪', duration: 30, difficulty: '初级', target: '背部拉伸', equipment: '门框', calories: 10, description: '抓住门框，身体后倾拉伸' },
    { id: 'back_010', name: '猫式伸展', emoji: '🐱', duration: 30, difficulty: '初级', target: '脊柱', equipment: '无', calories: 10, description: '四足跪姿，脊柱拱起和下沉' },
  ],
  
  // ========== 力量-肩部 ==========
  shoulders: [
    { id: 'shoulder_001', name: '标准俯卧撑', emoji: '💪', reps: 15, sets: 3, difficulty: '初级', target: '前束', equipment: '无', calories: 50, description: '双手略宽于肩' },
    { id: 'shoulder_002', name: '倒立撑', emoji: '🙃', reps: 6, sets: 3, difficulty: '高级', target: '全肩', equipment: '墙', calories: 70, description: '靠墙倒立做俯卧撑' },
    { id: 'shoulder_003', name: '派克俯卧撑', emoji: '🔺', reps: 12, sets: 3, difficulty: '中级', target: '肩+上胸', equipment: '无', calories: 55, description: '臀部抬高，头向地面移动' },
    { id: 'shoulder_004', name: '侧平举', emoji: '➡️', reps: 15, sets: 3, difficulty: '初级', target: '中束', equipment: '哑铃/水瓶', calories: 30, description: '双臂侧平举至肩高' },
    { id: 'shoulder_005', name: '前平举', emoji: '⬆️', reps: 15, sets: 3, difficulty: '初级', target: '前束', equipment: '哑铃/水瓶', calories: 30, description: '双臂前平举至肩高' },
    { id: 'shoulder_006', name: '侧平举(弹力带)', emoji: '🔴', reps: 15, sets: 3, difficulty: '初级', target: '中束', equipment: '弹力带', calories: 25, description: '脚踩弹力带，向两侧拉起' },
    { id: 'shoulder_007', name: '肩推', emoji: '⬆️', reps: 12, sets: 3, difficulty: '中级', target: '全肩', equipment: '哑铃/水瓶', calories: 40, description: '坐姿，推举重物过头' },
    { id: 'shoulder_008', name: '阿诺德推举', emoji: '🔄', reps: 10, sets: 3, difficulty: '中级', target: '全肩', equipment: '哑铃', calories: 45, description: '推举时旋转手臂' },
    { id: 'shoulder_009', name: '面拉', emoji: '😶', reps: 15, sets: 3, difficulty: '初级', target: '后束', equipment: '弹力带', calories: 25, description: '向面部拉弹力带' },
    { id: 'shoulder_010', name: 'YTWL', emoji: '🔤', reps: 10, sets: 3, difficulty: '中级', target: '肩袖', equipment: '无', calories: 35, description: '俯卧，手臂依次做Y-T-W-L形' },
  ],
  
  // ========== 力量-手臂 ==========
  arms: [
    { id: 'arm_001', name: '标准俯卧撑', emoji: '💪', reps: 15, sets: 3, difficulty: '初级', target: '三头肌', equipment: '无', calories: 50, description: '主要锻炼三头肌' },
    { id: 'arm_002', name: '三头肌撑体', emoji: '🪑', reps: 12, sets: 3, difficulty: '初级', target: '三头肌', equipment: '椅子', calories: 35, description: '双手撑椅子边缘，曲肘下降' },
    { id: 'arm_003', name: '窄距俯卧撑', emoji: '💎', reps: 12, sets: 3, difficulty: '中级', target: '三头肌', equipment: '无', calories: 55, description: '双手间距较窄' },
    { id: 'arm_004', name: '俯身臂屈伸', emoji: '🦅', reps: 12, sets: 3, difficulty: '初级', target: '三头肌', equipment: '哑铃/水瓶', calories: 30, description: '俯身，手臂向后伸直' },
    { id: 'arm_005', name: '颈后臂屈伸', emoji: '🙆', reps: 12, sets: 3, difficulty: '中级', target: '三头肌', equipment: '哑铃/水瓶', calories: 35, description: '重物从颈后向上伸直' },
    { id: 'arm_006', name: '钻石俯卧撑', emoji: '💎', reps: 10, sets: 3, difficulty: '高级', target: '三头肌', equipment: '无', calories: 60, description: '双手成钻石形' },
    { id: 'arm_007', name: '二头弯举', emoji: '💪', reps: 12, sets: 3, difficulty: '初级', target: '二头肌', equipment: '哑铃/水瓶', calories: 30, description: '屈肘向上弯举' },
    { id: 'arm_008', name: '锤式弯举', emoji: '🔨', reps: 12, sets: 3, difficulty: '初级', target: '肱肌', equipment: '哑铃/水瓶', calories: 30, description: '掌心相对弯举' },
    { id: 'arm_009', name: '集中弯举', emoji: '🎯', reps: 10, sets: 3, difficulty: '中级', target: '二头肌', equipment: '哑铃', calories: 35, description: '肘部固定在大腿内侧' },
    { id: 'arm_010', name: '弹力带弯举', emoji: '🔴', reps: 15, sets: 3, difficulty: '初级', target: '二头肌', equipment: '弹力带', calories: 25, description: '脚踩弹力带，向上弯举' },
    { id: 'arm_011', name: '反手俯卧撑', emoji: '👐', reps: 10, sets: 3, difficulty: '中级', target: '二头肌', equipment: '无', calories: 50, description: '手指向后，做俯卧撑' },
    { id: 'arm_012', name: '门架二头弯举', emoji: '🚪', reps: 12, sets: 3, difficulty: '初级', target: '二头肌', equipment: '毛巾+门', calories: 30, description: '用毛巾套门把手做弯举' },
  ],
  
  // ========== 核心-腹肌 ==========
  abs: [
    { id: 'abs_001', name: '卷腹', emoji: '📈', reps: 20, sets: 3, difficulty: '初级', target: '上腹', equipment: '无', calories: 30, description: '肩胛骨离地即可，不要拉头' },
    { id: 'abs_002', name: '仰卧举腿', emoji: '🦵', reps: 15, sets: 3, difficulty: '初级', target: '下腹', equipment: '无', calories: 30, description: '双腿伸直向上举起' },
    { id: 'abs_003', name: '俄罗斯转体', emoji: '↔️', reps: 30, sets: 3, difficulty: '初级', target: '侧腹', equipment: '无', calories: 35, description: '坐姿，双脚离地，左右转体' },
    { id: 'abs_004', name: '平板支撑', emoji: '⏱️', duration: 45, difficulty: '初级', target: '核心', equipment: '无', calories: 25, description: '肘撑，身体成一条直线' },
    { id: 'abs_005', name: '登山者', emoji: '⛰️', duration: 45, difficulty: '中级', target: '核心+心肺', equipment: '无', calories: 80, description: '俯卧撑姿势，双腿交替收腿' },
    { id: 'abs_006', name: '自行车卷腹', emoji: '🚴', reps: 30, sets: 3, difficulty: '中级', target: '全腹', equipment: '无', calories: 40, description: '卷腹时双腿做骑车动作' },
    { id: 'abs_007', name: '反向卷腹', emoji: '🔄', reps: 15, sets: 3, difficulty: '中级', target: '下腹', equipment: '无', calories: 35, description: '抬腿向胸部卷曲' },
    { id: 'abs_008', name: '侧平板支撑', emoji: '⏱️', duration: 30, difficulty: '中级', target: '侧腹', equipment: '无', calories: 25, description: '侧撑，身体成直线' },
    { id: 'abs_009', name: '死虫式', emoji: '🐛', reps: 20, sets: 3, difficulty: '初级', target: '核心', equipment: '无', calories: 30, description: '对侧手脚交替伸展' },
    { id: 'abs_010', name: 'V字卷腹', emoji: 'V', reps: 15, sets: 3, difficulty: '中级', target: '全腹', equipment: '无', calories: 40, description: '手脚同时抬起相触' },
    { id: 'abs_011', name: '悬垂举腿', emoji: '🦵', reps: 10, sets: 3, difficulty: '高级', target: '下腹', equipment: '单杠', calories: 50, description: '悬垂，双腿向上举' },
    { id: 'abs_012', name: '健腹轮', emoji: '🛞', reps: 10, sets: 3, difficulty: '高级', target: '全腹', equipment: '健腹轮', calories: 60, description: '跪姿，向前推出' },
    { id: 'abs_013', name: '真空腹', emoji: '🫁', duration: 30, difficulty: '中级', target: '腹横肌', equipment: '无', calories: 15, description: '呼气，腹部向内收' },
    { id: 'abs_014', name: '鸟狗式', emoji: '🐕', reps: 20, sets: 3, difficulty: '初级', target: '核心', equipment: '无', calories: 30, description: '四足跪姿，对侧手脚伸展' },
    { id: 'abs_015', name: '猎鸟狗式', emoji: '🦅', reps: 20, sets: 3, difficulty: '中级', target: '核心', equipment: '无', calories: 35, description: '鸟狗式进阶，肘膝相触' },
  ],
  
  // ========== 腿部 ==========
  legs: [
    { id: 'leg_001', name: '深蹲', emoji: '🏋️', reps: 20, sets: 3, difficulty: '初级', target: '大腿前侧+臀', equipment: '无', calories: 60, description: '膝盖与脚尖同向，蹲至大腿平行' },
    { id: 'leg_002', name: '弓步蹲', emoji: '🚶', reps: 20, sets: 3, difficulty: '初级', target: '大腿+臀', equipment: '无', calories: 65, description: '一步向前下蹲，后腿膝盖接近地面' },
    { id: 'leg_003', name: '臀桥', emoji: '🌉', reps: 20, sets: 3, difficulty: '初级', target: '臀部', equipment: '无', calories: 40, description: '仰卧，臀部向上顶起' },
    { id: 'leg_004', name: '单腿硬拉', emoji: '🦩', reps: 12, sets: 3, difficulty: '中级', target: '臀+大腿后侧', equipment: '哑铃/水瓶', calories: 50, description: '单腿站立，上身前倾' },
    { id: 'leg_005', name: '保加利亚深蹲', emoji: '🇧🇬', reps: 12, sets: 3, difficulty: '中级', target: '大腿+臀', equipment: '椅子', calories: 70, description: '后脚垫高，单腿下蹲' },
    { id: 'leg_006', name: '相扑深蹲', emoji: '🥋', reps: 15, sets: 3, difficulty: '初级', target: '大腿内侧', equipment: '无', calories: 55, description: '宽站距，脚尖外展深蹲' },
    { id: 'leg_007', name: '跳箱', emoji: '📦', reps: 12, sets: 3, difficulty: '高级', target: '爆发力', equipment: '台阶', calories: 100, description: '跳上箱子或台阶' },
    { id: 'leg_008', name: '箱式深蹲', emoji: '🪑', reps: 15, sets: 3, difficulty: '初级', target: '大腿', equipment: '椅子', calories: 50, description: '坐椅子后站起' },
    { id: 'leg_009', name: '哥萨克深蹲', emoji: '⚔️', reps: 12, sets: 3, difficulty: '中级', target: '大腿内侧', equipment: '无', calories: 60, description: '侧向深蹲，一腿伸直' },
    { id: 'leg_010', name: '单腿臀桥', emoji: '🌉', reps: 15, sets: 3, difficulty: '中级', target: '臀部', equipment: '无', calories: 45, description: '单腿臀桥，另一腿抬起' },
    { id: 'leg_011', name: '靠墙静蹲', emoji: '🧱', duration: 45, difficulty: '初级', target: '大腿', equipment: '墙', calories: 35, description: '背靠墙，大腿平行保持' },
    { id: 'leg_012', name: '提踵', emoji: '⬆️', reps: 25, sets: 3, difficulty: '初级', target: '小腿', equipment: '无', calories: 25, description: '双脚提起，踮起脚尖' },
    { id: 'leg_013', name: '单腿提踵', emoji: '⬆️', reps: 20, sets: 3, difficulty: '中级', target: '小腿', equipment: '无', calories: 30, description: '单脚提踵' },
    { id: 'leg_014', name: '腿举(弹力带)', emoji: '🔴', reps: 15, sets: 3, difficulty: '初级', target: '大腿', equipment: '弹力带', calories: 40, description: '坐姿，向前蹬弹力带' },
    { id: 'leg_015', name: '罗马尼亚硬拉', emoji: '🇷🇴', reps: 12, sets: 3, difficulty: '中级', target: '大腿后侧', equipment: '哑铃/水瓶', calories: 55, description: '微屈膝，上身前倾' },
  ],
  
  // ========== 瑜伽/拉伸 ==========
  yoga: [
    { id: 'yoga_001', name: '下犬式', emoji: '🐕', duration: 30, difficulty: '初级', target: '全身拉伸', equipment: '无', calories: 20, description: '臀部抬高，呈倒V字形' },
    { id: 'yoga_002', name: '婴儿式', emoji: '👶', duration: 30, difficulty: '初级', target: '背部放松', equipment: '无', calories: 10, description: '跪姿，臀部坐脚跟，上身前屈' },
    { id: 'yoga_003', name: '战士一式', emoji: '⚔️', duration: 30, difficulty: '初级', target: '腿部力量', equipment: '无', calories: 25, description: '弓步，双臂上举' },
    { id: 'yoga_004', name: '战士二式', emoji: '⚔️', duration: 30, difficulty: '初级', target: '腿部力量', equipment: '无', calories: 25, description: '侧弓步，双臂侧平举' },
    { id: 'yoga_005', name: '树式', emoji: '🌳', duration: 30, difficulty: '初级', target: '平衡', equipment: '无', calories: 15, description: '单腿站立，另一脚踩大腿内侧' },
    { id: 'yoga_006', name: '平板支撑', emoji: '⏱️', duration: 45, difficulty: '初级', target: '核心', equipment: '无', calories: 25, description: '肘撑，身体成直线' },
    { id: 'yoga_007', name: '眼镜蛇式', emoji: '🐍', duration: 30, difficulty: '初级', target: '背部伸展', equipment: '无', calories: 15, description: '俯卧，上身抬起' },
    { id: 'yoga_008', name: '猫牛式', emoji: '🐱', duration: 45, difficulty: '初级', target: '脊柱灵活', equipment: '无', calories: 15, description: '四足跪姿，脊柱拱起下沉' },
    { id: 'yoga_009', name: '鸽子式', emoji: '🕊️', duration: 30, difficulty: '中级', target: '髋部伸展', equipment: '无', calories: 20, description: '前腿屈膝横放，后腿伸直' },
    { id: 'yoga_010', name: '桥式', emoji: '🌉', duration: 30, difficulty: '初级', target: '臀部', equipment: '无', calories: 20, description: '仰卧，臀部向上顶' },
    { id: 'yoga_011', name: '三角式', emoji: '🔺', duration: 30, difficulty: '初级', target: '侧腰拉伸', equipment: '无', calories: 20, description: '侧弯，手触脚踝' },
    { id: 'yoga_012', name: '坐角式', emoji: '👐', duration: 45, difficulty: '初级', target: '大腿内侧', equipment: '无', calories: 15, description: '坐姿，双腿分开前屈' },
    { id: 'yoga_013', name: '蝴蝶式', emoji: '🦋', duration: 45, difficulty: '初级', target: '髋部', equipment: '无', calories: 10, description: '脚心相对，膝盖下沉' },
    { id: 'yoga_014', name: '船式', emoji: '⛵', duration: 30, difficulty: '中级', target: '核心', equipment: '无', calories: 25, description: '坐姿，双腿抬起呈V形' },
    { id: 'yoga_015', name: '乌鸦式', emoji: '🐦', duration: 15, difficulty: '高级', target: '手臂+核心', equipment: '无', calories: 30, description: '双手撑地，膝盖架在肘上' },
    { id: 'yoga_016', name: '头倒立', emoji: '🙃', duration: 30, difficulty: '高级', target: '全身', equipment: '无', calories: 35, description: '头部支撑，身体倒立' },
    { id: 'yoga_017', name: '骆驼式', emoji: '🐪', duration: 30, difficulty: '中级', target: '胸部打开', equipment: '无', calories: 20, description: '跪姿，上身向后弯曲' },
    { id: 'yoga_018', name: '鱼式', emoji: '🐟', duration: 30, difficulty: '初级', target: '胸部打开', equipment: '无', calories: 15, description: '仰卧，胸部向上拱起' },
    { id: 'yoga_019', name: '快乐婴儿式', emoji: '👶', duration: 45, difficulty: '初级', target: '髋部放松', equipment: '无', calories: 10, description: '仰卧，抓住脚踝拉向地面' },
    { id: 'yoga_020', name: '摊尸式', emoji: '😌', duration: 180, difficulty: '初级', target: '放松', equipment: '无', calories: 5, description: '仰卧，完全放松' },
  ],
  
  // ========== HIIT ==========
  hiit: [
    { id: 'hiit_001', name: 'Tabata开合跳', emoji: '🔥', duration: 240, difficulty: '中级', target: '心肺', equipment: '无', calories: 200, description: '20秒运动10秒休息，循环8组' },
    { id: 'hiit_002', name: '波比跳挑战', emoji: '💥', reps: 50, difficulty: '高级', target: '全身', equipment: '无', calories: 300, description: '50个波比跳，最快速度' },
    { id: 'hiit_003', name: 'HIIT循环A', emoji: '🔁', duration: 600, difficulty: '中级', target: '全身', equipment: '无', calories: 400, description: '深蹲跳、俯卧撑、登山者、开合跳各30秒' },
    { id: 'hiit_004', name: 'HIIT循环B', emoji: '🔁', duration: 600, difficulty: '高级', target: '全身', equipment: '无', calories: 450, description: '波比跳、深蹲跳、俯卧撑击掌、高抬腿各30秒' },
    { id: 'hiit_005', name: '20-10训练法', emoji: '⏱️', duration: 480, difficulty: '中级', target: '全身', equipment: '无', calories: 350, description: '4个动作，每个20秒运动10秒休息' },
    { id: 'hiit_006', name: 'EMOM训练', emoji: '⏰', duration: 600, difficulty: '高级', target: '全身', equipment: '无', calories: 400, description: '每分钟完成指定动作，剩余时间休息' },
    { id: 'hiit_007', name: '金字塔训练', emoji: '🔺', duration: 900, difficulty: '高级', target: '全身', equipment: '无', calories: 500, description: '动作次数从1增加到10再减少' },
  ],
};

// 获取所有动作
function getAllExercises() {
  const all = [];
  Object.keys(EXERCISE_DATABASE).forEach(cat => {
    EXERCISE_DATABASE[cat].forEach(ex => {
      all.push({ ...ex, category: cat });
    });
  });
  return all;
}

// 按分类获取
function getExercisesByCategory(category) {
  return EXERCISE_DATABASE[category] || [];
}

// 搜索动作
function searchExercises(query) {
  return getAllExercises().filter(ex => 
    ex.name.toLowerCase().includes(query.toLowerCase()) ||
    ex.target.toLowerCase().includes(query.toLowerCase()) ||
    ex.id.toLowerCase().includes(query.toLowerCase())
  );
}

// 按难度筛选
function getExercisesByDifficulty(difficulty) {
  return getAllExercises().filter(ex => ex.difficulty === difficulty);
}

// 按目标肌群筛选
function getExercisesByTarget(target) {
  return getAllExercises().filter(ex => ex.target.toLowerCase().includes(target.toLowerCase()));
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXERCISE_DATABASE, getAllExercises, getExercisesByCategory, searchExercises, getExercisesByDifficulty, getExercisesByTarget };
}
