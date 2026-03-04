/**
 * AMBROSE Design System v3.0
 * 顶级App设计规范 - 参考 Linear、Notion、Keep、Nike Training Club
 */

const DesignSystem = {
    // 颜色系统 - 专业级暗黑模式
    colors: {
        // 主色调
        primary: {
            50: '#e6fffe',
            100: '#b3fffc',
            200: '#80fff9',
            300: '#4dfff6',
            400: '#1afff3',
            500: '#00f3ff', // 主色
            600: '#00c2cc',
            700: '#009299',
            800: '#006166',
            900: '#003133'
        },
        secondary: {
            50: '#ffe6f2',
            100: '#ffb3db',
            200: '#ff80c4',
            300: '#ff4dad',
            400: '#ff1a96',
            500: '#ff00a0', // 副色
            600: '#cc0080',
            700: '#990060',
            800: '#660040',
            900: '#330020'
        },
        accent: {
            500: '#b829dd',
            600: '#9320b0'
        },
        // 中性色 - 灰度系统
        neutral: {
            0: '#ffffff',
            50: '#f5f5f7',
            100: '#e8e8ed',
            200: '#d1d1d6',
            300: '#a1a1aa',
            400: '#8e8e93',
            500: '#636366',
            600: '#48484a',
            700: '#3a3a3c',
            800: '#2c2c2e',
            900: '#1c1c1e',
            950: '#0a0a0f' // 最深背景
        },
        // 语义化颜色
        semantic: {
            success: '#00ff88',
            warning: '#ffaa00',
            danger: '#ff0040',
            info: '#00f3ff'
        },
        // 背景色
        background: {
            base: '#050508',
            elevated: '#0a0a0f',
            overlay: 'rgba(10, 10, 15, 0.95)',
            card: 'rgba(15, 18, 30, 0.85)',
            hover: 'rgba(255, 255, 255, 0.05)',
            pressed: 'rgba(255, 255, 255, 0.1)'
        },
        // 边框色
        border: {
            subtle: 'rgba(255, 255, 255, 0.08)',
            default: 'rgba(255, 255, 255, 0.15)',
            strong: 'rgba(255, 255, 255, 0.25)',
            primary: 'rgba(0, 243, 255, 0.5)',
            glow: 'rgba(0, 243, 255, 0.3)'
        },
        // 文字色
        text: {
            primary: '#ffffff',
            secondary: '#a1a1aa',
            tertiary: '#636366',
            disabled: '#48484a',
            inverse: '#050508'
        }
    },

    // 字体系统
    typography: {
        fontFamily: {
            display: "'Orbitron', 'Inter', system-ui, sans-serif",
            body: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
            mono: "'JetBrains Mono', 'Fira Code', monospace",
            numeric: "'Rajdhani', 'Inter', sans-serif"
        },
        sizes: {
            xs: { size: '11px', lineHeight: '16px', letterSpacing: '0.02em' },
            sm: { size: '13px', lineHeight: '20px', letterSpacing: '0' },
            base: { size: '15px', lineHeight: '24px', letterSpacing: '0' },
            lg: { size: '17px', lineHeight: '28px', letterSpacing: '-0.01em' },
            xl: { size: '20px', lineHeight: '32px', letterSpacing: '-0.02em' },
            '2xl': { size: '24px', lineHeight: '36px', letterSpacing: '-0.02em' },
            '3xl': { size: '30px', lineHeight: '40px', letterSpacing: '-0.03em' },
            '4xl': { size: '36px', lineHeight: '48px', letterSpacing: '-0.03em' }
        },
        weights: {
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            black: 800
        }
    },

    // 间距系统 - 8px基准
    spacing: {
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px'
    },

    // 圆角系统
    radius: {
        none: '0',
        sm: '6px',
        base: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        full: '9999px'
    },

    // 阴影系统
    shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
        base: '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.2)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
        glow: {
            primary: '0 0 20px rgba(0, 243, 255, 0.4)',
            secondary: '0 0 20px rgba(255, 0, 160, 0.4)',
            success: '0 0 20px rgba(0, 255, 136, 0.4)'
        },
        inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
    },

    // 动画系统
    animation: {
        duration: {
            instant: '0ms',
            fast: '150ms',
            normal: '250ms',
            slow: '350ms',
            slower: '500ms'
        },
        easing: {
            default: 'cubic-bezier(0.4, 0, 0.2, 1)',
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            out: 'cubic-bezier(0, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        },
        keyframes: {
            fadeIn: `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `,
            slideUp: `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `,
            scaleIn: `
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `,
            pulse: `
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `,
            shimmer: `
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `,
            float: `
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `,
            glow: `
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 5px currentColor; }
                    50% { box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
                }
            `,
            typing: `
                @keyframes typing {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-4px); }
                }
            `
        }
    },

    // 组件规范
    components: {
        button: {
            base: {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontWeight: 600,
                borderRadius: '12px',
                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                border: 'none',
                outline: 'none'
            },
            sizes: {
                sm: { padding: '8px 12px', fontSize: '13px', height: '32px' },
                md: { padding: '10px 16px', fontSize: '15px', height: '40px' },
                lg: { padding: '12px 20px', fontSize: '17px', height: '48px' }
            },
            variants: {
                primary: {
                    background: 'linear-gradient(135deg, #00f3ff, #00c2cc)',
                    color: '#050508',
                    boxShadow: '0 4px 15px rgba(0, 243, 255, 0.3)'
                },
                secondary: {
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                },
                ghost: {
                    background: 'transparent',
                    color: '#a1a1aa'
                },
                danger: {
                    background: 'linear-gradient(135deg, #ff0040, #cc0033)',
                    color: '#ffffff'
                }
            }
        },
        card: {
            base: {
                background: 'rgba(15, 18, 30, 0.85)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
            },
            hover: {
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                borderColor: 'rgba(255, 255, 255, 0.15)'
            }
        },
        input: {
            base: {
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '15px',
                color: '#ffffff',
                transition: 'all 200ms ease',
                outline: 'none'
            },
            focus: {
                borderColor: 'rgba(0, 243, 255, 0.5)',
                boxShadow: '0 0 0 3px rgba(0, 243, 255, 0.1)'
            }
        },
        message: {
            user: {
                background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.15), rgba(0, 243, 255, 0.05))',
                border: '1px solid rgba(0, 243, 255, 0.3)',
                borderRadius: '16px 16px 4px 16px'
            },
            bot: {
                background: 'linear-gradient(135deg, rgba(255, 0, 160, 0.12), rgba(255, 0, 160, 0.04))',
                border: '1px solid rgba(255, 0, 160, 0.25)',
                borderRadius: '16px 16px 16px 4px'
            }
        }
    },

    // Z-index层级
    zIndex: {
        base: 0,
        dropdown: 100,
        sticky: 200,
        modal: 300,
        popover: 400,
        tooltip: 500,
        toast: 600
    },

    // 断点系统
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    }
};

// 导出设计系统
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DesignSystem;
}
