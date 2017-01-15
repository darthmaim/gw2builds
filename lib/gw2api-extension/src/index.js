import * as endpoints from 'gw2api-client/build/endpoints';
import endpointMixin from './endpoint-mixin';

class ExtendedAccountEndpoint extends endpointMixin(endpoints.AccountEndpoint) {}
class ExtendedAchievementsEndpoint extends endpointMixin(endpoints.AchievementsEndpoint) {}
class ExtendedBackstoryEndpoint extends endpointMixin(endpoints.BackstoryEndpoint) {}
class ExtendedBuildEndpoint extends endpointMixin(endpoints.BuildEndpoint) {}
class ExtendedCharactersEndpoint extends endpointMixin(endpoints.CharactersEndpoint) {}
class ExtendedColorsEndpoint extends endpointMixin(endpoints.ColorsEndpoint) {}
class ExtendedCommerceEndpoint extends endpointMixin(endpoints.CommerceEndpoint) {}
class ExtendedContinentsEndpoint extends endpointMixin(endpoints.ContinentsEndpoint) {}
class ExtendedCurrenciesEndpoint extends endpointMixin(endpoints.CurrenciesEndpoint) {}
class ExtendedEmblemEndpoint extends endpointMixin(endpoints.EmblemEndpoint) {}
class ExtendedEventsEndpoint extends endpointMixin(endpoints.EventsEndpoint) {}
class ExtendedFilesEndpoint extends endpointMixin(endpoints.FilesEndpoint) {}
class ExtendedFinishersEndpoint extends endpointMixin(endpoints.FinishersEndpoint) {}
class ExtendedGuildEndpoint extends endpointMixin(endpoints.GuildEndpoint) {}
class ExtendedItemsEndpoint extends endpointMixin(endpoints.ItemsEndpoint) {}
class ExtendedItemstatsEndpoint extends endpointMixin(endpoints.ItemstatsEndpoint) {}
class ExtendedLegendsEndpoint extends endpointMixin(endpoints.LegendsEndpoint) {}
class ExtendedMapsEndpoint extends endpointMixin(endpoints.MapsEndpoint) {}
class ExtendedMasteriesEndpoint extends endpointMixin(endpoints.MasteriesEndpoint) {}
class ExtendedMaterialsEndpoint extends endpointMixin(endpoints.MaterialsEndpoint) {}
class ExtendedMinisEndpoint extends endpointMixin(endpoints.MinisEndpoint) {}
class ExtendedOutfitsEndpoint extends endpointMixin(endpoints.OutfitsEndpoint) {}
class ExtendedPetsEndpoint extends endpointMixin(endpoints.PetsEndpoint) {}
class ExtendedProfessionsEndpoint extends endpointMixin(endpoints.ProfessionsEndpoint) {}
class ExtendedPvpEndpoint extends endpointMixin(endpoints.PvpEndpoint) {}
class ExtendedQuaggansEndpoint extends endpointMixin(endpoints.QuaggansEndpoint) {}
class ExtendedRecipesEndpoint extends endpointMixin(endpoints.RecipesEndpoint) {}
class ExtendedSkillsEndpoint extends endpointMixin(endpoints.SkillsEndpoint) {}
class ExtendedSkinsEndpoint extends endpointMixin(endpoints.SkinsEndpoint) {}
class ExtendedSpecializationsEndpoint extends endpointMixin(endpoints.SpecializationsEndpoint) {}
class ExtendedStoriesEndpoint extends endpointMixin(endpoints.StoriesEndpoint) {}
class ExtendedTitlesEndpoint extends endpointMixin(endpoints.TitlesEndpoint) {}
class ExtendedTokeninfoEndpoint extends endpointMixin(endpoints.TokeninfoEndpoint) {}
class ExtendedTraitsEndpoint extends endpointMixin(endpoints.TraitsEndpoint) {}
class ExtendedWorldsEndpoint extends endpointMixin(endpoints.WorldsEndpoint) {}
class ExtendedWvwEndpoint extends endpointMixin(endpoints.WvwEndpoint) {}

export default function (apiClient, data) {
    if (!data) {
        throw new TypeError('data cannot be null or undefined');
    }

    apiClient.account = () => new ExtendedAccountEndpoint(apiClient, data.account);
    apiClient.achievements = () => new ExtendedAchievementsEndpoint(apiClient, data.achievements);
    apiClient.backstory = () => new ExtendedBackstoryEndpoint(apiClient, data.backstory);
    apiClient.build = () => new ExtendedBuildEndpoint(apiClient, data.build);
    apiClient.characters = name => new ExtendedCharactersEndpoint(apiClient, data.characters, name);
    apiClient.colors = () => new ExtendedColorsEndpoint(apiClient, data.colors);
    apiClient.commerce = () => new ExtendedCommerceEndpoint(apiClient, data.commerce);
    apiClient.continents = () => new ExtendedContinentsEndpoint(apiClient, data.continents);
    apiClient.currencies = () => new ExtendedCurrenciesEndpoint(apiClient, data.currencies);
    apiClient.emblem = () => new ExtendedEmblemEndpoint(apiClient, data.emblem);
    apiClient.events = () => new ExtendedEventsEndpoint(apiClient, data.events);
    apiClient.files = () => new ExtendedFilesEndpoint(apiClient, data.files);
    apiClient.finishers = () => new ExtendedFinishersEndpoint(apiClient, data.finishers);
    apiClient.guild = id => new ExtendedGuildEndpoint(apiClient, data.guild, id);
    apiClient.items = () => new ExtendedItemsEndpoint(apiClient, data.items);
    apiClient.itemstats = () => new ExtendedItemstatsEndpoint(apiClient, data.itemstats);
    apiClient.legends = () => new ExtendedLegendsEndpoint(apiClient, data.legends);
    apiClient.maps = () => new ExtendedMapsEndpoint(apiClient, data.maps);
    apiClient.masteries = () => new ExtendedMasteriesEndpoint(apiClient, data.masteries);
    apiClient.materials = () => new ExtendedMaterialsEndpoint(apiClient, data.materials);
    apiClient.minis = () => new ExtendedMinisEndpoint(apiClient, data.minis);
    apiClient.outfits = () => new ExtendedOutfitsEndpoint(apiClient, data.outfits);
    apiClient.pets = () => new ExtendedPetsEndpoint(apiClient, data.pets);
    apiClient.professions = () => new ExtendedProfessionsEndpoint(apiClient, data.professions);
    apiClient.pvp = () => new ExtendedPvpEndpoint(apiClient, data.pvp);
    apiClient.quaggans = () => new ExtendedQuaggansEndpoint(apiClient, data.quaggans);
    apiClient.recipes = () => new ExtendedRecipesEndpoint(apiClient, data.recipes);
    apiClient.skills = () => new ExtendedSkillsEndpoint(apiClient, data.skills);
    apiClient.skins = () => new ExtendedSkinsEndpoint(apiClient, data.skins);
    apiClient.specializations = () => new ExtendedSpecializationsEndpoint(apiClient, data.specializations);
    apiClient.stories = () => new ExtendedStoriesEndpoint(apiClient, data.stories);
    apiClient.titles = () => new ExtendedTitlesEndpoint(apiClient, data.titles);
    apiClient.tokeninfo = () => new ExtendedTokeninfoEndpoint(apiClient, data.tokeninfo);
    apiClient.traits = () => new ExtendedTraitsEndpoint(apiClient, data.traits);
    apiClient.worlds = () => new ExtendedWorldsEndpoint(apiClient, data.worlds);
    apiClient.wvw = () => new ExtendedWvwEndpoint(apiClient, data.wvw);
    return apiClient;
}
