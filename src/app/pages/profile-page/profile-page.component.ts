import { Component, Inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-profile-page',
	standalone: true,
	imports: [],
	templateUrl: './profile-page.component.html',
	styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
	profileService = Inject(ProfileService)
	route = Inject(ActivatedRoute)

	profile$ = this.route.params.pipe(
		switchMap(({ id }) => {
			if (id === 'me') return toObservable(this.profileService.me)

			return this.profileService.getAccount(id)
		})
	)
}
