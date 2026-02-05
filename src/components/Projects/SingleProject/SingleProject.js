 import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaPlay, FaCode } from 'react-icons/fa';

import placeholder from '../../../assets/png/placeholder.png';
import './SingleProject.css';

function SingleProject({ id, name, desc, tags, code, demo, image, theme }) {
    const [openDemo, setOpenDemo] = useState(false);
    const [demoType, setDemoType] = useState(null);
    const [embedSrc, setEmbedSrc] = useState('');

    const getDemoType = (url) => {
        if (!url) return null;
        const u = url.toLowerCase();
        if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
        if (u.endsWith('.mp4') || u.endsWith('.webm') || u.endsWith('.ogg')) return 'video';
        return 'external';
    };

    const buildEmbedSrc = (url, type) => {
        if (type === 'youtube') {
            try {
                // convert various youtube urls to embed url
                if (url.includes('watch?v=')) {
                    return url.replace('watch?v=', 'embed/').split('&')[0];
                }
                if (url.includes('youtu.be/')) {
                    const id = url.split('youtu.be/')[1].split('?')[0];
                    return `https://www.youtube.com/embed/${id}`;
                }
            } catch (e) {
                return url;
            }
        }
        return url;
    };

    const handleOpenDemo = (e) => {
        if (!demo) return;
        e && e.preventDefault();
        const type = getDemoType(demo);
        if (type === 'external') {
            // open external link in new tab
            window.open(demo, '_blank', 'noopener,noreferrer');
            return;
        }
        const src = buildEmbedSrc(demo, type);
        setDemoType(type);
        setEmbedSrc(src);
        setOpenDemo(true);
    };

    const handleCloseDemo = () => {
        setOpenDemo(false);
        setEmbedSrc('');
        setDemoType(null);
    };
    const useStyles = makeStyles((t) => ({
        iconBtn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 50,
            border: `2px solid ${theme.tertiary}`,
            color: theme.tertiary,
            transition: 'all 0.2s',
            '&:hover': {
                backgroundColor: theme.secondary,
                color: theme.primary,
                transform: 'scale(1.1)',
                border: `2px solid ${theme.secondary}`,
            },
        },
        icon: {
            fontSize: '1.1rem',
            transition: 'all 0.2s',
            '&:hover': {},
        },
    }));

    const classes = useStyles();

    return (
        <div
            key={id}
            className='singleProject'
            style={{ backgroundColor: theme.primary400 }}
        >
            <div className='projectContent'>
                <h2
                    id={name.replace(' ', '-').toLowerCase()}
                    style={{ color: theme.tertiary }}
                >
                    {name}
                </h2>
                <img src={image ? image : placeholder} alt={name} />
                <div className='project--showcaseBtn'>
                    <button
                        onClick={handleOpenDemo}
                        className={classes.iconBtn}
                        aria-labelledby={`${name
                            .replace(' ', '-')
                            .toLowerCase()} ${name
                            .replace(' ', '-')
                            .toLowerCase()}-demo`}
                    >
                        <FaPlay
                            id={`${name
                                .replace(' ', '-')
                                .toLowerCase()}-demo`}
                            className={classes.icon}
                            aria-label='Demo'
                        />
                    </button>
                    <a
                        href={code}
                        target='_blank'
                        rel='noreferrer'
                        className={classes.iconBtn}
                        aria-labelledby={`${name
                            .replace(' ', '-')
                            .toLowerCase()} ${name
                            .replace(' ', '-')
                            .toLowerCase()}-code`}
                    >
                        <FaCode
                            id={`${name
                                .replace(' ', '-')
                                .toLowerCase()}-code`}
                            className={classes.icon}
                            aria-label='Code'
                        />
                    </a>
                </div>

                {openDemo && (
                    <div className='project-modal' role='dialog' aria-modal='true'>
                        <div className='project-modal__overlay' onClick={handleCloseDemo} />
                        <div className='project-modal__content'>
                            <button className='project-modal__close' onClick={handleCloseDemo} aria-label='Close'>✕</button>
                            {demoType === 'youtube' && (
                                <iframe
                                    title={`${name}-demo-iframe`}
                                    src={embedSrc}
                                    frameBorder='0'
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                />
                            )}
                            {demoType === 'video' && (
                                <video controls src={embedSrc || demo} />
                            )}
                        </div>
                    </div>
                )}
            </div>
            <p
                className='project--desc'
                style={{
                    background: theme.secondary,
                    color: theme.tertiary,
                }}
            >
                {desc}
            </p>
            <div
                className='project--lang'
                style={{
                    background: theme.secondary,
                    color: theme.tertiary80,
                }}
            >
                {tags.map((tag, id) => (
                    <span key={id}>{tag}</span>
                ))}
            </div>
        </div>
    );
}

export default SingleProject;
