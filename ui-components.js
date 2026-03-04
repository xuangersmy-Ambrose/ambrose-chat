/**
 * AMBROSE UI Components v3.0
 * 顶级App级别的组件库
 */

class UIComponents {
    constructor() {
        this.DesignSystem = window.DesignSystem || {};
        this.colors = this.DesignSystem.colors || {};
    }

    // 创建元素并设置样式
    createElement(tag, styles = {}, attrs = {}) {
        const el = document.createElement(tag);
        Object.assign(el.style, styles);
        Object.entries(attrs).forEach(([key, val]) => {
            if (key === 'className') el.className = val;
            else if (key === 'innerHTML') el.innerHTML = val;
            else if (key === 'textContent') el.textContent = val;
            else if (key.startsWith('on')) el[key] = val;
            else el.setAttribute(key, val);
        });
        return el;
    }

    // 创建按钮
    createButton(options = {}) {
        const {
            text = '',
            icon = '',
            variant = 'primary',
            size = 'md',
            loading = false,
            disabled = false,
            onClick = null
        } = options;

        const btn = this.createElement('button', {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: '600',
            borderRadius: '12px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            border: 'none',
            outline: 'none',
            opacity: disabled ? '0.5' : '1',
            transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
        }, { disabled });

        const sizeStyles = {
            sm: { padding: '8px 12px', fontSize: '13px', height: '32px' },
            md: { padding: '10px 16px', fontSize: '15px', height: '40px' },
            lg: { padding: '12px 20px', fontSize: '17px', height: '48px' }
        };
        Object.assign(btn.style, sizeStyles[size]);

        const variantStyles = {
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
            },
            success: {
                background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
                color: '#050508'
            }
        };
        Object.assign(btn.style, variantStyles[variant]);

        if (loading) {
            btn.innerHTML = `<span class="spinner" style="display:inline-block;width:16px;height:16px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:spin 0.75s linear infinite;"></span><span>${text}</span>`;
        } else {
            btn.innerHTML = `${icon ? `<span>${icon}</span>` : ''}${text ? `<span>${text}</span>` : ''}`;
        }

        if (!disabled) {
            btn.onmouseenter = () => {
                btn.style.transform = 'translateY(-2px)';
                if (variant === 'primary') btn.style.boxShadow = '0 6px 25px rgba(0, 243, 255, 0.5)';
            };
            btn.onmouseleave = () => {
                btn.style.transform = 'translateY(0)';
                if (variant === 'primary') btn.style.boxShadow = '0 4px 15px rgba(0, 243, 255, 0.3)';
            };
        }

        if (onClick && !disabled) {
            btn.onclick = (e) => {
                this.createRipple(e, btn);
                onClick(e);
            };
        }

        return btn;
    }

    // 涟漪效果
    createRipple(e, element) {
        const rect = element.getBoundingClientRect();
        const ripple = this.createElement('span', {
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
            pointerEvents: 'none',
            left: `${e.clientX - rect.left}px`,
            top: `${e.clientY - rect.top}px`,
            width: '20px',
            height: '20px',
            marginLeft: '-10px',
            marginTop: '-10px'
        });
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // 创建卡片
    createCard(options = {}) {
        const { children = null, padding = '24px', hoverable = true, onClick = null } = options;

        const card = this.createElement('div', {
            background: 'rgba(15, 18, 30, 0.85)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            padding,
            transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: onClick ? 'pointer' : 'default'
        });

        if (hoverable) {
            card.onmouseenter = () => {
                card.style.transform = 'translateY(-4px)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
                card.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            };
            card.onmouseleave = () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
                card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            };
        }

        if (children) {
            if (typeof children === 'string') card.innerHTML = children;
            else if (children instanceof HTMLElement) card.appendChild(children);
        }

        if (onClick) card.onclick = onClick;

        return card;
    }

    // 创建图标按钮
    createIconButton(options = {}) {
        const { icon = '', size = 'md', variant = 'default', onClick = null } = options;

        const sizes = {
            sm: { width: '32px', height: '32px', fontSize: '16px' },
            md: { width: '40px', height: '40px', fontSize: '20px' },
            lg: { width: '48px', height: '48px', fontSize: '24px' }
        };

        const variants = {
            default: { background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#a1a1aa' },
            primary: { background: 'linear-gradient(135deg, #00f3ff, #00c2cc)', border: 'none', color: '#050508' },
            danger: { background: 'rgba(255, 0, 64, 0.1)', border: '1px solid rgba(255, 0, 64, 0.3)', color: '#ff0040' }
        };

        const btn = this.createElement('button', {
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '12px', cursor: 'pointer', transition: 'all 200ms ease', outline: 'none',
            ...sizes[size], ...variants[variant]
        });

        btn.innerHTML = icon;

        btn.onmouseenter = () => {
            btn.style.transform = 'scale(1.05)';
            if (variant === 'default') {
                btn.style.background = 'rgba(255, 255, 255, 0.1)';
                btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        };
        btn.onmouseleave = () => {
            btn.style.transform = 'scale(1)';
            if (variant === 'default') {
                btn.style.background = 'rgba(255, 255, 255, 0.05)';
                btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        };

        if (onClick) btn.onclick = (e) => { this.createRipple(e, btn); onClick(e); };

        return btn;
    }

    // 创建列表项
    createListItem(options = {}) {
        const { icon = '', title = '', subtitle = '', onClick = null, highlight = false } = options;

        const item = this.createElement('div', {
            display: 'flex', alignItems: 'center', gap: '16px', padding: '16px',
            background: highlight ? 'rgba(0, 243, 255, 0.05)' : 'transparent',
            borderRadius: '12px', cursor: onClick ? 'pointer' : 'default',
            transition: 'all 200ms ease',
            border: highlight ? '1px solid rgba(0, 243, 255, 0.2)' : '1px solid transparent'
        });

        if (icon) {
            const iconEl = this.createElement('div', {
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px'
            }, { textContent: icon });
            item.appendChild(iconEl);
        }

        const content = this.createElement('div', { flex: '1', minWidth: '0' });
        if (title) content.appendChild(this.createElement('div', {
            fontSize: '15px', fontWeight: '600', color: '#ffffff', marginBottom: '4px',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }, { textContent: title }));
        if (subtitle) content.appendChild(this.createElement('div', {
            fontSize: '13px', color: '#636366'
        }, { textContent: subtitle }));
        item.appendChild(content);

        if (onClick) {
            item.onclick = onClick;
            item.onmouseenter = () => { item.style.background = 'rgba(255, 255, 255, 0.05)'; };
            item.onmouseleave = () => { item.style.background = highlight ? 'rgba(0, 243, 255, 0.05)' : 'transparent'; };
        }

        return item;
    }

    // 创建标签
    createTag(options = {}) {
        const { text = '', color = '#00f3ff', size = 'md' } = options;
        const sizes = { sm: { padding: '2px 8px', fontSize: '11px' }, md: { padding: '4px 12px', fontSize: '12px' }, lg: { padding: '6px 16px', fontSize: '13px' } };
        return this.createElement('span', {
            display: 'inline-flex', alignItems: 'center', borderRadius: '20px', fontWeight: '500',
            color, background: `${color}15`, border: `1px solid ${color}30`, ...sizes[size]
        }, { textContent: text });
    }

    // 显示 Toast
    showToast(options = {}) {
        const { message = '', type = 'info', duration = 3000 } = options;
        const colors = { info: '#00f3ff', success: '#00ff88', warning: '#ffaa00', error: '#ff0040' };

        const toast = this.createElement('div', {
            position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%) translateY(100px)',
            background: 'rgba(15, 18, 30, 0.95)', border: `1px solid ${colors[type]}50`,
            borderRadius: '12px', padding: '12px 24px', color: '#ffffff', fontSize: '14px',
            fontWeight: '500', zIndex: '1000', opacity: '0', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)', boxShadow: `0 10px 30px ${colors[type]}20`
        }, { textContent: message });

        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);

        return toast;
    }

    // 创建模态框
    createModal(options = {}) {
        const { title = '', content = null, onClose = null, actions = [] } = options;

        const overlay = this.createElement('div', {
            position: 'fixed', inset: '0', background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)', zIndex: '1000', opacity: '0', transition: 'opacity 300ms ease'
        });

        const modal = this.createElement('div', {
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(0.95)',
            background: 'rgba(15, 18, 30, 0.95)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px', minWidth: '320px', maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto',
            zIndex: '1001', opacity: '0', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        });

        if (title) {
            const header = this.createElement('div', {
                fontSize: '20px', fontWeight: '700', color: '#ffffff', marginBottom: '16px',
                paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }, { textContent: title });
            modal.appendChild(header);
        }

        if (content) {
            const body = this.createElement('div', { marginBottom: actions.length ? '24px' : '0' });
            if (typeof content === 'string') body.innerHTML = content;
            else body.appendChild(content);
            modal.appendChild(body);
        }

        if (actions.length) {
            const footer = this.createElement('div', { display: 'flex', gap: '12px', justifyContent: 'flex-end' });
            actions.forEach(action => footer.appendChild(this.createButton(action)));
            modal.appendChild(footer);
        }

        const closeBtn = this.createElement('button', {
            position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px',
            borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'
        }, { textContent: '✕' });
        closeBtn.onclick = () => this.closeModal(overlay, modal, onClose);
        modal.appendChild(closeBtn);

        overlay.onclick = (e) => { if (e.target === overlay) this.closeModal(overlay, modal, onClose); };

        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        return { overlay, modal };
    }

    closeModal(overlay, modal, onClose) {
        overlay.style.opacity = '0';
        modal.style.opacity = '0';
        modal.style.transform = 'translate(-50%, -50%) scale(0.95)';
        setTimeout(() => { overlay.remove(); modal.remove(); if (onClose) onClose(); }, 300);
    }

    // 创建进度条
    createProgress(options = {}) {
        const { value = 0, max = 100, color = '#00f3ff', size = 'md', showLabel = true } = options;
        const sizes = { sm: { height: '4px' }, md: { height: '8px' }, lg: { height: '12px' } };

        const container = this.createElement('div', { width: '100%' });

        if (showLabel) {
            const label = this.createElement('div', {
                display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888', marginBottom: '6px'
            });
            label.innerHTML = `<span>进度</span><span style="color: ${color}">${Math.round((value / max) * 100)}%</span>`;
            container.appendChild(label);
        }

        const track = this.createElement('div', {
            width: '100%', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden', ...sizes[size]
        });
        const fill = this.createElement('div', {
            width: `${(value / max) * 100}%`, height: '100%', background: color, borderRadius: '9999px',
            transition: 'width 500ms cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: `0 0 10px ${color}`
        });
        track.appendChild(fill);
        container.appendChild(track);

        return { container, fill };
    }

    // 创建头像
    createAvatar(options = {}) {
        const { src = null, text = '', size = 'md', status = null } = options;
        const sizes = { sm: { width: '32px', height: '32px', fontSize: '14px' }, md: { width: '44px', height: '44px', fontSize: '18px' }, lg: { width: '64px', height: '64px', fontSize: '24px' }, xl: { width: '96px', height: '96px', fontSize: '36px' } };

        const container = this.createElement('div', { position: 'relative', display: 'inline-flex', ...sizes[size] });
        const avatar = this.createElement('div', {
            width: '100%', height: '100%', borderRadius: '50%',
            background: src ? `url(${src}) center/cover` : 'linear-gradient(135deg, #00f3ff, #ff00a0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#ffffff',
            border: '2px solid rgba(255, 255, 255, 0.1)'
        });
        if (!src && text) avatar.textContent = text.slice(0, 2).toUpperCase();
        container.appendChild(avatar);

        if (status) {
            const statusColors = { online: '#00ff88', away: '#ffaa00', busy: '#ff0040', offline: '#636366' };
            const indicator = this.createElement('div', {
                position: 'absolute', bottom: '0', right: '0',
                width: size === 'sm' ? '10px' : size === 'md' ? '14px' : '18px',
                height: size === 'sm' ? '10px' : size === 'md' ? '14px' : '18px',
                borderRadius: '50%', background: statusColors[status],
                border: `2px solid #0a0a0f`, boxShadow: `0 0 8px ${statusColors[status]}`
            });
            container.appendChild(indicator);
        }

        return container;
    }

    // 创建空状态
    createEmptyState(options = {}) {
        const { icon = '', title = '暂无数据', description = '', action = null } = options;
        const container = this.createElement('div', {
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '48px 24px', textAlign: 'center'
        });

        container.appendChild(this.createElement('div', {
            fontSize: '56px', marginBottom: '16px', opacity: '0.5'
        }, { textContent: icon }));
        container.appendChild(this.createElement('div', {
            fontSize: '18px', fontWeight: '600', color: '#ffffff', marginBottom: '8px'
        }, { textContent: title }));
        if (description) container.appendChild(this.createElement('div', {
            fontSize: '14px', color: '#636366', marginBottom: action ? '24px' : '0', maxWidth: '280px'
        }, { textContent: description }));
        if (action) container.appendChild(this.createButton(action));

        return container;
    }
}

// 全局动画样式
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes ripple { to { transform: scale(4); opacity: 0; } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
`;
document.head.appendChild(styleSheet);

// 导出
window.UIComponents = UIComponents;
