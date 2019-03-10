import IMedia from '../entities/media';
import leven from 'leven';

interface ISortingMedia {
  similarity: number;
  media: IMedia;
}

const revertData = (excessMedia: ISortingMedia[]): IMedia[] => {
  const revertedMedia: IMedia[] = [];
  excessMedia.forEach((sortingData) => {
    revertedMedia.push(sortingData.media);
  });
  return revertedMedia;
}

export default function sortSearch(media: IMedia[], search: string): IMedia[] {
  const simalarMedia: ISortingMedia[] = [];
  media.forEach((entity) => {
    const sortedEntity: ISortingMedia = {
      media: entity,
      similarity: leven(search, entity.name),
    };
    simalarMedia.push(sortedEntity);
  });
  simalarMedia.sort((entityA, entityB) => entityA.similarity - entityB.similarity);
  return revertData(simalarMedia);
}
