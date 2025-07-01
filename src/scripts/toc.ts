/**
 * Left sidebar TOC with toggle functionality.
 * Clean and minimal design inspired by modern note-taking apps.
 */
class LeftSidebarTOC {
  private allHeadings: HTMLElement[] = [];
  private tocHeadings: HTMLElement[] = [];
  private isOpen: boolean = false;
  private activeId: string = '';
  private observer: IntersectionObserver | null = null;

  // DOM Elements
  private sidebar: HTMLElement | null = document.getElementById('toc-sidebar');
  private nav: HTMLElement | null = document.getElementById('toc-nav');
  private toggleBtn: HTMLElement | null = document.getElementById('toc-toggle-btn');
  private closeBtn: HTMLElement | null = document.getElementById('toc-close');
  private overlay: HTMLElement | null = document.getElementById('toc-overlay');

  public init(): void {
    if (!this.sidebar || !this.nav || !this.toggleBtn) {
      return;
    }

    this.scanHeadings();

    if (this.allHeadings.length === 0 || this.tocHeadings.length === 0) {
      this.sidebar.style.display = 'none';
      return;
    }

    this.sidebar.style.display = 'block';
    this.generateTOC();
    this.bindEvents();
    this.setupScrollTracking();
    
    // Initial check for active heading
    setTimeout(() => {
      this.updateActiveHeading();
    }, 100);
  }

  private scanHeadings(): void {
    const content = document.getElementById('post-content');
    if (!content) return;

    this.allHeadings = Array.from(content.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'));

    this.tocHeadings = this.allHeadings
      .filter(el => ['H1', 'H2', 'H3'].includes(el.tagName))
      .map((el, index) => {
        if (!el.id) {
          el.id = `toc-heading-${index}`;
        }
        return el;
      });
  }


  private generateTOC(): void {
    if (!this.nav) return;

    const minLevel = Math.min(...this.tocHeadings.map(h => parseInt(h.tagName[1], 10)));

    const tocHTML = this.tocHeadings.map(heading => {
      const level = parseInt(heading.tagName[1], 10);
      const indent = Math.max(0, level - minLevel) * 20;
      const fontSize = 15 - (level - minLevel);

      return `
        <a href="#${heading.id}" 
           data-target-id="${heading.id}"
           style="padding-left: ${indent}px; font-size: ${fontSize}px;">
          ${heading.textContent || ''}
        </a>`;
    }).join('');

    this.nav.innerHTML = tocHTML;
  }

  private bindEvents(): void {
    this.toggleBtn?.addEventListener('click', () => this.toggle());
    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());

    this.nav?.addEventListener('click', (e) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.dataset.targetId) {
        e.preventDefault();
        this.scrollToHeading(target.dataset.targetId);
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  private setupScrollTracking(): void {
    // Use both Intersection Observer and scroll event for better responsiveness
    this.observer = new IntersectionObserver(
      () => {
        this.updateActiveHeading();
      },
      { 
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    this.tocHeadings.forEach(heading => this.observer?.observe(heading));
    
    // Add scroll event listener for real-time updates
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateActiveHeading();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private updateActiveHeading(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const offset = 80; // Offset for header
    
    let activeHeading = '';
    let minDistance = Infinity;
    
    // Find the heading that's closest to the top of the viewport
    this.tocHeadings.forEach(heading => {
      const rect = heading.getBoundingClientRect();
      const elementTop = rect.top;
      
      // Check if the heading is in the upper part of the viewport
      if (elementTop <= offset + 50 && elementTop >= -rect.height) {
        const distance = Math.abs(elementTop - offset);
        if (distance < minDistance) {
          minDistance = distance;
          activeHeading = heading.id;
        }
      }
    });
    
    // Fallback: if no heading is found in the ideal range, find the nearest visible one
    if (!activeHeading) {
      this.tocHeadings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= viewportHeight && rect.bottom >= 0) {
          const distanceFromTop = Math.abs(rect.top - offset);
          if (distanceFromTop < minDistance) {
            minDistance = distanceFromTop;
            activeHeading = heading.id;
          }
        }
      });
    }
    
    // If we're at the very top, use the first heading
    if (!activeHeading && scrollTop < 100 && this.tocHeadings.length > 0) {
      activeHeading = this.tocHeadings[0].id;
    }
    
    if (activeHeading && activeHeading !== this.activeId) {
      this.setActiveHeading(activeHeading);
    }
  }

  private setActiveHeading(id: string): void {
    if (this.activeId === id) return;
    this.activeId = id;

    this.nav?.querySelectorAll('a').forEach(a => {
      a.classList.toggle('is-active', a.dataset.targetId === id);
    });
  }

  private scrollToHeading(id: string): void {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    this.isOpen = true;
    this.sidebar?.classList.add('is-open');
  }

  private close(): void {
    this.isOpen = false;
    this.sidebar?.classList.remove('is-open');
  }
}

export function initToc() {
  if (document.getElementById('post-content')) {
    const toc = new LeftSidebarTOC();
    toc.init();
  }
}