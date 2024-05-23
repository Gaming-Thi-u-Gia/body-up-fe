import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const ImageDetail = () => {
    const images = [
        {
            thumbnailURL: 'https://placekitten.com/150/150',
            largeURL: 'https://placekitten.com/600/400',
            width: 600,
            height: 400,
        },
        {
            thumbnailURL: 'https://placekitten.com/150/150',
            largeURL: 'https://placekitten.com/600/400',
            width: 600,
            height: 400,
        },
    ];
    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: '#' + props.galleryID,
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, []);

    return (
        <div className="pswp-gallery" id={props.galleryID}>
            {props.images.map((image, index) => (
                <a
                    href={image.largeURL}
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    key={props.galleryID + '-' + index}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={image.thumbnailURL} alt="" />
                </a>
            ))}
        </div>
    );
}

export default ImageDetail
