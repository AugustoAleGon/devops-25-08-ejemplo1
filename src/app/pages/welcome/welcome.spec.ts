import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { WelcomeComponent } from './welcome';

describe('WelcomeComponent - HU-008: Acceso al Módulo de Educación', () => {
    let component: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [WelcomeComponent, RouterTestingModule.withRoutes([])],
            providers: [
                { provide: Router, useValue: routerSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(WelcomeComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Dashboard de Progreso Educativo', () => {
        it('should display education progress dashboard', () => {
            const progressDashboard = fixture.debugElement.query(By.css('.education-dashboard'));
            expect(progressDashboard).toBeTruthy();
        });

        it('should show progress percentage', () => {
            const progressPercentage = fixture.debugElement.query(By.css('.progress-percentage'));
            expect(progressPercentage.nativeElement.textContent.trim()).toBe('25%');
        });

        it('should display completed lessons count', () => {
            const completedLessons = fixture.debugElement.query(By.css('.stat-number'));
            expect(completedLessons.nativeElement.textContent.trim()).toBe('3');
        });

        it('should display total available lessons', () => {
            const totalLessons = fixture.debugElement.queryAll(By.css('.stat-number'))[1];
            expect(totalLessons.nativeElement.textContent.trim()).toBe('12');
        });

        it('should have proper ARIA labels for accessibility', () => {
            const progressCircle = fixture.debugElement.query(By.css('.progress-circle'));
            expect(progressCircle.attributes['aria-label']).toBe('Progreso general: 25% completado');
        });
    });

    describe('Categorías de Aprendizaje', () => {
        it('should display all three education categories', () => {
            const categoryCards = fixture.debugElement.queryAll(By.css('.category-card'));
            expect(categoryCards.length).toBe(3);
        });

        it('should display basic category with correct progress', () => {
            const basicCategory = fixture.debugElement.query(By.css('[aria-describedby="basic-description"]'));
            expect(basicCategory).toBeTruthy();

            const basicTitle = basicCategory.query(By.css('.category-title'));
            expect(basicTitle.nativeElement.textContent.trim()).toBe('Básico');

            const basicProgress = basicCategory.query(By.css('.progress-fill'));
            expect(basicProgress.styles['width']).toBe('40%');
        });

        it('should display intermediate category with zero progress', () => {
            const intermediateCategory = fixture.debugElement.query(By.css('[aria-describedby="intermediate-description"]'));
            expect(intermediateCategory).toBeTruthy();

            const intermediateTitle = intermediateCategory.query(By.css('.category-title'));
            expect(intermediateTitle.nativeElement.textContent.trim()).toBe('Intermedio');

            const intermediateProgress = intermediateCategory.query(By.css('.progress-fill'));
            expect(intermediateProgress.styles['width']).toBe('0%');
        });

        it('should display advanced category with zero progress', () => {
            const advancedCategory = fixture.debugElement.query(By.css('[aria-describedby="advanced-description"]'));
            expect(advancedCategory).toBeTruthy();

            const advancedTitle = advancedCategory.query(By.css('.category-title'));
            expect(advancedTitle.nativeElement.textContent.trim()).toBe('Avanzado');

            const advancedProgress = advancedCategory.query(By.css('.progress-fill'));
            expect(advancedProgress.styles['width']).toBe('0%');
        });

        it('should have proper accessibility attributes for category cards', () => {
            const categoryCards = fixture.debugElement.queryAll(By.css('.category-card'));

            categoryCards.forEach(card => {
                expect(card.attributes['role']).toBe('button');
                expect(card.attributes['tabindex']).toBe('0');
                expect(card.attributes['aria-describedby']).toBeTruthy();
            });
        });
    });

    describe('Navegación al Módulo de Educación', () => {
        it('should navigate to education module when clicking basic category', () => {
            const basicCategory = fixture.debugElement.query(By.css('[aria-describedby="basic-description"]'));

            basicCategory.triggerEventHandler('click', null);

            expect(router.navigate).toHaveBeenCalledWith(['/educacion'], {
                queryParams: { categoria: 'basico' }
            });
        });

        it('should navigate to education module when clicking intermediate category', () => {
            const intermediateCategory = fixture.debugElement.query(By.css('[aria-describedby="intermediate-description"]'));

            intermediateCategory.triggerEventHandler('click', null);

            expect(router.navigate).toHaveBeenCalledWith(['/educacion'], {
                queryParams: { categoria: 'intermedio' }
            });
        });

        it('should navigate to education module when clicking advanced category', () => {
            const advancedCategory = fixture.debugElement.query(By.css('[aria-describedby="advanced-description"]'));

            advancedCategory.triggerEventHandler('click', null);

            expect(router.navigate).toHaveBeenCalledWith(['/educacion'], {
                queryParams: { categoria: 'avanzado' }
            });
        });

        it('should navigate to education module when pressing Enter on category card', () => {
            const basicCategory = fixture.debugElement.query(By.css('[aria-describedby="basic-description"]'));
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });

            basicCategory.triggerEventHandler('keydown.enter', enterEvent);

            expect(router.navigate).toHaveBeenCalledWith(['/educacion'], {
                queryParams: { categoria: 'basico' }
            });
        });

        it('should navigate to education module when pressing Space on category card', () => {
            const basicCategory = fixture.debugElement.query(By.css('[aria-describedby="basic-description"]'));
            const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });

            basicCategory.triggerEventHandler('keydown.space', spaceEvent);

            expect(router.navigate).toHaveBeenCalledWith(['/educacion'], {
                queryParams: { categoria: 'basico' }
            });
        });

        it('should navigate to full education module when clicking access button', () => {
            const educationAccessButton = fixture.debugElement.query(By.css('a[routerLink="/educacion"]'));

            expect(educationAccessButton.attributes['routerLink']).toBe('/educacion');
        });
    });

    describe('Recomendaciones Personalizadas', () => {
        it('should display personalized recommendation', () => {
            const recommendationCard = fixture.debugElement.query(By.css('.recommendation-card'));
            expect(recommendationCard).toBeTruthy();
        });

        it('should show recommended lesson title', () => {
            const recommendationTitle = fixture.debugElement.query(By.css('.recommendation-title'));
            expect(recommendationTitle.nativeElement.textContent.trim()).toBe('¿Qué es una tarjeta de crédito?');
        });

        it('should show lesson duration and level', () => {
            const lessonDuration = fixture.debugElement.query(By.css('.lesson-duration'));
            const lessonLevel = fixture.debugElement.query(By.css('.lesson-level'));

            expect(lessonDuration.nativeElement.textContent.trim()).toBe('3 min');
            expect(lessonLevel.nativeElement.textContent.trim()).toBe('Básico');
        });

        it('should have accessible start button for recommendation', () => {
            const startButton = fixture.debugElement.query(By.css('.recommendation-card .btn'));
            expect(startButton.attributes['aria-label']).toBe('Comenzar lección: ¿Qué es una tarjeta de crédito?');
        });
    });

    describe('Accesibilidad del Módulo de Educación', () => {
        it('should have proper heading structure for education section', () => {
            const educationHeading = fixture.debugElement.query(By.css('#education-heading'));
            expect(educationHeading.nativeElement.textContent.trim()).toBe('Aprende sobre finanzas personales');
        });

        it('should have screen reader only headings for progress sections', () => {
            const srOnlyHeadings = fixture.debugElement.queryAll(By.css('.sr-only'));
            expect(srOnlyHeadings.length).toBeGreaterThan(0);
        });

        it('should have proper ARIA regions for education sections', () => {
            const educationRegions = fixture.debugElement.queryAll(By.css('[role="region"]'));
            expect(educationRegions.length).toBeGreaterThan(0);

            educationRegions.forEach(region => {
                expect(region.attributes['aria-labelledby']).toBeTruthy();
            });
        });

        it('should have proper ARIA labels for progress bars', () => {
            const progressBars = fixture.debugElement.queryAll(By.css('.progress-fill'));

            progressBars.forEach(bar => {
                expect(bar.attributes['aria-label']).toBeTruthy();
            });
        });
    });

    describe('Método navigateToEducation', () => {
        it('should call router.navigate with correct parameters for basic category', () => {
            component.navigateToEducation('basico');

            expect(router.navigate).toHaveBeenCalledWith(['/educacion'], {
                queryParams: { categoria: 'basico' }
            });
        });

        it('should call router.navigate with correct parameters for intermediate category', () => {
            component.navigateToEducation('intermedio');

            expect(router.navigate).toHaveBeenCalledWith(['/educacion'], {
                queryParams: { categoria: 'intermedio' }
            });
        });

        it('should call router.navigate with correct parameters for advanced category', () => {
            component.navigateToEducation('avanzado');

            expect(router.navigate).toHaveBeenCalledWith(['/educacion'], {
                queryParams: { categoria: 'avanzado' }
            });
        });
    });

    describe('Datos del Componente', () => {
        it('should display correct app name and description', () => {
            const appTitle = fixture.debugElement.query(By.css('.welcome-title'));
            const appSubtitle = fixture.debugElement.query(By.css('.welcome-subtitle'));

            expect(appTitle.nativeElement.textContent.trim()).toBe('Bohío');
            expect(appSubtitle.nativeElement.textContent.trim()).toBe('Plataforma Financiera Inclusiva para República Dominicana');
        });

        it('should display all target users', () => {
            const targetUserItems = fixture.debugElement.queryAll(By.css('.target-user-item'));
            expect(targetUserItems.length).toBe(6);

            const expectedUsers = [
                'Migrantes en proceso de regularización',
                'Personas con baja alfabetización digital',
                'Trabajadores informales',
                'Residentes de zonas rurales',
                'Adultos mayores',
                'Personas con discapacidades visuales'
            ];

            targetUserItems.forEach((item, index) => {
                const userText = item.query(By.css('.target-user-text'));
                expect(userText.nativeElement.textContent.trim()).toBe(expectedUsers[index]);
            });
        });
    });
});
