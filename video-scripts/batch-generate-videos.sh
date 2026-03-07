#!/bin/bash
# AMBROSE健身视频批量生成脚本（使用FFmpeg + 免费素材）
# 使用方法: bash batch-generate-videos.sh

# 配置
OUTPUT_DIR="./output-videos"
ASSETS_DIR="./assets"
FONT_FILE="/usr/share/fonts/truetype/noto/NotoSansCJK-Bold.ttc"  # 根据实际情况修改

# 创建输出目录
mkdir -p $OUTPUT_DIR

# 视频配置
RESOLUTION="1080x1920"  # 竖屏9:16
FRAMERATE=30
VIDEO_CODEC="libx264"
AUDIO_CODEC="aac"

# 颜色配置
BG_COLOR="#0a0a0a"      # 深空黑
PRIMARY_COLOR="#00D4FF" # 青色
TEXT_COLOR="#ffffff"    # 白色

echo "🎬 开始批量生成健身教学视频..."
echo "========================================"

# ========== 视频1: 标准俯卧撑 ==========
echo "📹 生成视频1: 标准俯卧撑..."
ffmpeg -y -f lavfi -i color=c=$BG_COLOR:s=$RESOLUTION:d=5 \
  -vf "drawtext=fontfile=$FONT_FILE:text='标准俯卧撑':fontsize=80:fontcolor=$PRIMARY_COLOR:x=(w-text_w)/2:y=(h-text_h)/2,\
       drawtext=fontfile=$FONT_FILE:text='胸肌训练经典动作':fontsize=40:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=(h+100)/2" \
  -c:v $VIDEO_CODEC -pix_fmt yuv420p -t 5 \
  $OUTPUT_DIR/01_title.mp4 2>/dev/null

# 生成黑屏+文字片段（实际使用时替换为真实素材）
ffmpeg -y -f lavfi -i color=c=$BG_COLOR:s=$RESOLUTION:d=25 \
  -vf "drawtext=fontfile=$FONT_FILE:text='准备姿势演示画面':fontsize=60:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=(h-text_h)/2,\
       drawtext=fontfile=$FONT_FILE:text='此处将插入真实训练素材':fontsize=30:fontcolor=$PRIMARY_COLOR:x=(w-text_w)/2:y=(h+80)/2,\
       drawtext=fontfile=$FONT_FILE:text='步骤1: 双手略宽于肩，身体成直线':fontsize=36:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=200,\
       drawtext=fontfile=$FONT_FILE:text='步骤2: 胸部贴近地面后推起':fontsize=36:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=280,\
       drawtext=fontfile=$FONT_FILE:text='步骤3: 保持核心收紧，不要塌腰':fontsize=36:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=360" \
  -c:v $VIDEO_CODEC -pix_fmt yuv420p -t 25 \
  $OUTPUT_DIR/01_content.mp4 2>/dev/null

# 合并片段
echo "  合并视频片段..."
ffmpeg -y -i $OUTPUT_DIR/01_title.mp4 -i $OUTPUT_DIR/01_content.mp4 \
  -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[outv]" -map "[outv]" \
  -c:v $VIDEO_CODEC -pix_fmt yuv420p \
  $OUTPUT_DIR/01_pushup_tutorial.mp4 2>/dev/null

echo "  ✅ 视频1生成完成"

# ========== 视频2: 深蹲 ==========
echo "📹 生成视频2: 深蹲..."
ffmpeg -y -f lavfi -i color=c=$BG_COLOR:s=$RESOLUTION:d=5 \
  -vf "drawtext=fontfile=$FONT_FILE:text='深蹲':fontsize=100:fontcolor=$PRIMARY_COLOR:x=(w-text_w)/2:y=(h-text_h)/2,\
       drawtext=fontfile=$FONT_FILE:text='腿部训练之王':fontsize=40:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=(h+120)/2" \
  -c:v $VIDEO_CODEC -pix_fmt yuv420p -t 5 \
  $OUTPUT_DIR/02_title.mp4 2>/dev/null

ffmpeg -y -f lavfi -i color=c=$BG_COLOR:s=$RESOLUTION:d=25 \
  -vf "drawtext=fontfile=$FONT_FILE:text='深蹲动作演示':fontsize=60:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=(h-text_h)/2,\
       drawtext=fontfile=$FONT_FILE:text='步骤1: 双脚与肩同宽站立':fontsize=36:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=200,\
       drawtext=fontfile=$FONT_FILE:text='步骤2: 下蹲至大腿平行地面':fontsize=36:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=280,\
       drawtext=fontfile=$FONT_FILE:text='步骤3: 背部挺直，重心在脚跟':fontsize=36:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=360" \
  -c:v $VIDEO_CODEC -pix_fmt yuv420p -t 25 \
  $OUTPUT_DIR/02_content.mp4 2>/dev/null

ffmpeg -y -i $OUTPUT_DIR/02_title.mp4 -i $OUTPUT_DIR/02_content.mp4 \
  -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[outv]" -map "[outv]" \
  -c:v $VIDEO_CODEC -pix_fmt yuv420p \
  $OUTPUT_DIR/02_squat_tutorial.mp4 2>/dev/null

echo "  ✅ 视频2生成完成"

# ========== 视频3: 平板支撑 ==========
echo "📹 生成视频3: 平板支撑..."
ffmpeg -y -f lavfi -i color=c=$BG_COLOR:s=$RESOLUTION:d=5 \
  -vf "drawtext=fontfile=$FONT_FILE:text='平板支撑':fontsize=100:fontcolor=$PRIMARY_COLOR:x=(w-text_w)/2:y=(h-text_h)/2,\
       drawtext=fontfile=$FONT_FILE:text='核心稳定训练':fontsize=40:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=(h+120)/2" \
  -c:v $VIDEO_CODEC -pix_fmt yuv420p -t 5 \
  $OUTPUT_DIR/03_title.mp4 2>/dev/null

ffmpeg -y -f lavfi -i color=c=$BG_COLOR:s=$RESOLUTION:d=25 \
  -vf "drawtext=fontfile=$FONT_FILE:text='平板支撑动作演示':fontsize=60:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=(h-text_h)/2,\
       drawtext=fontfile=$FONT_FILE:text='步骤1: 肘部在肩膀正下方':fontsize=36:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=200,\
       drawtext=fontfile=$FONT_FILE:text='步骤2: 身体成一条直线':fontsize=36:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=280,\
       drawtext=fontfile=$FONT_FILE:text='步骤3: 收紧腹部，均匀呼吸':fontsize=36:fontcolor=$TEXT_COLOR:x=(w-text_w)/2:y=360" \
  -c:v $VIDEO_CODEC -pix_fmt yuv420p -t 25 \
  $OUTPUT_DIR/03_content.mp4 2>/dev/null

ffmpeg -y -i $OUTPUT_DIR/03_title.mp4 -i $OUTPUT_DIR/03_content.mp4 \
  -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[outv]" -map "[outv]" \
  -c:v $VIDEO_CODEC -pix_fmt yuv420p \
  $OUTPUT_DIR/03_plank_tutorial.mp4 2>/dev/null

echo "  ✅ 视频3生成完成"

# 清理临时文件
rm -f $OUTPUT_DIR/*_title.mp4 $OUTPUT_DIR/*_content.mp4

echo ""
echo "========================================"
echo "✅ 所有视频生成完成！"
echo "📁 输出目录: $OUTPUT_DIR"
echo ""
echo "⚠️ 注意: 这些视频使用了占位符文字"
echo "📝 请将生成的视频导入剪映，替换为真实训练素材"
echo "🎬 或手动下载免费素材后重新运行脚本"
